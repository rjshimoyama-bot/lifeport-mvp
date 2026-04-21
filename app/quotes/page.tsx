"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { QuoteBundle } from "../../lib/types";
import { seedQuotes } from "../../lib/mock";
import { formatJPY } from "../../lib/format";

type SortMode = "recommended" | "price";
type InsuranceType = "あり" | "簡易" | "なし";

type SubmittedQuote = {
  companyId: string;
  companyName: string;
  companyNote: string;
  rating: number;
  options: {
    id: string;
    label: string;
    price: number;
    crew: number;
    boxes: number;
    insurance: InsuranceType;
    hint?: string;
  }[];
  truck?: string;
  insurance?: InsuranceType;
};

type LatestVideoMeta = {
  id: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
  size: number;
};

function normalizeInsurance(value: string | undefined): InsuranceType {
  if (value === "簡易" || value === "なし") return value;
  return "あり";
}

export default function QuotesPage() {
  const [sort, setSort] = useState<SortMode>("recommended");
  const [selected, setSelected] = useState<{ companyId: string; optionId: string } | null>(null);
  const [bundles, setBundles] = useState<QuoteBundle[]>([]);
  const [latestVideoMeta, setLatestVideoMeta] = useState<LatestVideoMeta | null>(null);

  useEffect(() => {
    const primaryDate =
      localStorage.getItem("lp_primaryDate") ||
      new Date().toISOString().slice(0, 10);

    const windowValue =
      (localStorage.getItem("lp_window") as "0" | "3" | "7" | "wk") || "3";

    const timeband =
      (localStorage.getItem("lp_timeband") as "am" | "pm" | "all") || "all";

    const submittedQuotes = JSON.parse(
      localStorage.getItem("movis_submitted_quotes") || "[]"
    ) as SubmittedQuote[];

    const hasVideoMeta = localStorage.getItem("movis_latest_video_meta");
    if (hasVideoMeta) {
      try {
        setLatestVideoMeta(JSON.parse(hasVideoMeta));
      } catch {
        // noop
      }
    }

    const mockBundles = seedQuotes({
      primaryDate,
      window: windowValue,
      timeband,
    });

    const submittedBundles: QuoteBundle[] = submittedQuotes.map((sq) => ({
      company: {
        id: sq.companyId,
        name: sq.companyName,
        note: sq.companyNote,
      },
      rating: sq.rating,
      options: sq.options.map((o) => ({
        id: o.id,
        label: o.label,
        price: o.price,
        crew: o.crew,
        boxes: o.boxes,
        insurance: normalizeInsurance(o.insurance),
        hint: o.hint || "この見積は動画確認後に作成された見積です。",
      })),
      basePriceMin: Math.min(...sq.options.map((o) => o.price)),
    }));

    const merged = [...submittedBundles, ...mockBundles];
    setBundles(merged);
  }, []);

  const sorted = useMemo(() => {
    const copy = [...bundles];
    if (sort === "recommended") {
      copy.sort((a, b) => (b.rating - a.rating) || (a.basePriceMin - b.basePriceMin));
    } else {
      copy.sort((a, b) => a.basePriceMin - b.basePriceMin);
    }
    return copy;
  }, [bundles, sort]);

  const chosen = useMemo(() => {
    if (!selected) return null;
    const b = bundles.find((x) => x.company.id === selected.companyId);
    const o = b?.options.find((x) => x.id === selected.optionId);
    if (!b || !o) return null;
    return { b, o };
  }, [bundles, selected]);

  const hasUploadedVideo = !!latestVideoMeta;

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1120px] px-4 py-6 md:px-6 md:py-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-navy">
            Movis
          </Link>
          <span className="text-sm text-muted">見積比較</span>
        </header>

        <section className="mt-8">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-soft md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <h1 className="text-2xl font-bold text-navy md:text-3xl">
                  複数社の見積もりを比較
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted md:text-base">
                  同じ引越会社でも、日程によって価格が変わることがあります。
                  価格だけでなく、条件や対応内容も比較して選べます。
                </p>
              </div>

              <button
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-white px-4 text-sm font-medium text-navy hover:bg-bg"
                onClick={() => setSort((v) => (v === "recommended" ? "price" : "recommended"))}
              >
                並び替え：{sort === "recommended" ? "おすすめ順" : "価格順"}
              </button>
            </div>

            <div className="mt-5 rounded-xl border border-cyan/30 bg-cyan/10 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-semibold text-navy">見積の前提情報</div>
                  <div className="mt-1 text-sm text-muted">
                    {hasUploadedVideo
                      ? "アップロード済み動画をもとに、各社が見積作成を進めています。"
                      : "動画未登録のため、一部の見積はデモ用表示を含みます。"}
                  </div>
                </div>

                <span
                  className={[
                    "inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
                    hasUploadedVideo
                      ? "border-green-300 bg-green-50 text-green-700"
                      : "border-border bg-white text-muted",
                  ].join(" ")}
                >
                  {hasUploadedVideo ? "動画アップロード済み" : "動画未登録"}
                </span>
              </div>

              {latestVideoMeta && (
                <div className="mt-3 rounded-xl border border-white/60 bg-white p-3">
                  <div className="text-xs text-muted">確認対象動画</div>
                  <div className="mt-1 text-sm font-semibold text-navy">
                    {latestVideoMeta.fileName}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 rounded-xl border border-cyan/30 bg-cyan/10 p-4">
              <div className="text-sm font-semibold text-navy">Movis AI 査定</div>
              <div className="mt-2 grid gap-3 md:grid-cols-4">
                <AiStat title="荷物量" value="標準〜やや多め" />
                <AiStat title="想定作業人数" value="2名" />
                <AiStat title="想定トラック" value="2tクラス" />
                <AiStat title="想定価格帯" value="7〜8万円台" />
              </div>
              <p className="mt-3 text-xs leading-5 text-muted">
                日程に柔軟性があるため、ルート効率のよい候補では価格が抑えられる可能性があります。
              </p>
            </div>

            <div className="mt-8 space-y-5">
              {sorted.map((b, index) => (
                <QuoteCard
                  key={b.company.id}
                  bundle={b}
                  rank={index}
                  onChoose={(companyId, optionId) => setSelected({ companyId, optionId })}
                  hasUploadedVideo={hasUploadedVideo}
                />
              ))}
            </div>

            {chosen && (
              <div className="mt-8 rounded-2xl border border-cyan/30 bg-cyan/10 p-5">
                <div className="text-sm font-semibold text-navy">選択中の見積もり</div>
                <div className="mt-2 text-lg font-bold text-navy">
                  {chosen.b.company.name} / {chosen.o.label} / {formatJPY(chosen.o.price)}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  このまま次の画面で、チャット確認や契約フローにつなげられます。
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-navy hover:bg-bg"
                href="/progress"
              >
                戻る
              </Link>
              <Link
                className="inline-flex h-12 items-center justify-center rounded-lg border border-navy bg-white px-5 text-sm font-semibold text-navy hover:bg-bg"
                href="/chat"
              >
                チャットへ
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function AiStat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/60 bg-white p-3">
      <div className="text-xs text-muted">{title}</div>
      <div className="mt-1 text-sm font-semibold text-navy">{value}</div>
    </div>
  );
}

function QuoteCard({
  bundle,
  rank,
  onChoose,
  hasUploadedVideo,
}: {
  bundle: QuoteBundle;
  rank: number;
  onChoose: (companyId: string, optionId: string) => void;
  hasUploadedVideo: boolean;
}) {
  const [active, setActive] = useState(bundle.options[0]?.id ?? "");
  const option = bundle.options.find((o) => o.id === active) ?? bundle.options[0];

  const tag =
    rank === 0
      ? { label: "おすすめ", style: "border-cyan/30 bg-cyan/10 text-navy" }
      : bundle.basePriceMin === option.price
      ? { label: "最安候補", style: "border-green-300 bg-green-50 text-green-700" }
      : null;

  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-xl font-bold text-navy">{bundle.company.name}</div>
            {tag && (
              <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tag.style}`}>
                {tag.label}
              </span>
            )}
            {hasUploadedVideo && (
              <span className="inline-flex rounded-full border border-green-300 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                動画確認後の見積
              </span>
            )}
          </div>
          <div className="mt-2 text-sm text-muted">
            評価：★{bundle.rating.toFixed(1)} ／ {bundle.company.note}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-bg p-4 md:min-w-[220px]">
          <div className="text-xs text-muted">この会社の最低価格</div>
          <div className="mt-1 text-2xl font-bold text-navy">{formatJPY(bundle.basePriceMin)}</div>
        </div>
      </div>

      {hasUploadedVideo && (
        <div className="mt-4 rounded-xl border border-green-300 bg-green-50 p-4 text-sm leading-6 text-green-800">
          この見積は動画確認後に作成された見積です。
        </div>
      )}

      <div className="mt-5 overflow-x-auto">
        <div className="flex min-w-max gap-2">
          {bundle.options.map((o) => {
            const isActive = o.id === active;
            return (
              <button
                key={o.id}
                onClick={() => setActive(o.id)}
                className={[
                  "min-w-[140px] rounded-xl border px-4 py-3 text-left transition",
                  isActive
                    ? "border-cyan bg-[#E0F2FE] text-navy"
                    : "border-border bg-white text-muted hover:bg-bg",
                ].join(" ")}
              >
                <div className="text-sm font-semibold">{o.label}</div>
                <div className={`mt-1 text-sm ${isActive ? "text-navy" : "text-muted"}`}>
                  {formatJPY(o.price)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <InfoBox title="作業員" value={`${option.crew}名`} />
        <InfoBox title="ダンボール" value={`${option.boxes}箱`} />
        <InfoBox title="保険" value={option.insurance} />
        <InfoBox title="AI評価" value="条件良好" />
      </div>

      {option.hint && (
        <div className="mt-4 rounded-xl border border-cyan/30 bg-cyan/10 p-4 text-sm leading-6 text-navy">
          {option.hint}
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-navy hover:bg-bg"
          onClick={() => alert("詳細表示は次フェーズで追加予定です。")}
        >
          詳細を見る
        </button>

        <button
          className="inline-flex h-12 items-center justify-center rounded-lg bg-cyan px-5 text-sm font-semibold text-white hover:bg-[#0891B2]"
          onClick={() => {
            localStorage.setItem(
              "movis_selected_quote",
              JSON.stringify({
                company: bundle.company.name,
                plan: option.label,
                price: formatJPY(option.price),
                crew: `${option.crew}名`,
                truck: "2tクラス",
                insurance: option.insurance,
                note: hasUploadedVideo
                  ? "この見積は動画確認後に作成された見積です。"
                  : option.hint || "条件の良い見積もり候補です。",
              })
            );
            onChoose(bundle.company.id, option.id);
          }}
        >
          この日程で選ぶ
        </button>
      </div>
    </div>
  );
}

function InfoBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-bg p-4">
      <div className="text-xs text-muted">{title}</div>
      <div className="mt-1 text-sm font-semibold text-navy">{value}</div>
    </div>
  );
}
