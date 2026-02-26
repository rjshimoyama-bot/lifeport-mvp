"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { QuoteBundle } from "../../lib/types";
import { seedQuotes } from "../../lib/mock";
import { formatJPY } from "../../lib/format";

type SortMode = "recommended" | "price";

export default function QuotesPage() {
  const [sort, setSort] = useState<SortMode>("recommended");
  const [selected, setSelected] = useState<{ companyId: string; optionId: string } | null>(null);
  const [bundles, setBundles] = useState<QuoteBundle[]>([]);

  useEffect(() => {
    const primaryDate = localStorage.getItem("lp_primaryDate") || new Date().toISOString().slice(0, 10);
    const window = (localStorage.getItem("lp_window") as any) || "3";
    const timeband = (localStorage.getItem("lp_timeband") as any) || "all";
  
    setBundles(seedQuotes({ primaryDate, window, timeband }));
  }, []);

  const sorted = useMemo(() => {
    const copy = [...bundles];
    if (sort === "recommended") copy.sort((a, b) => (b.rating - a.rating) || (a.basePriceMin - b.basePriceMin));
    else copy.sort((a, b) => a.basePriceMin - b.basePriceMin);
    return copy;
  }, [bundles, sort]);

  const chosen = useMemo(() => {
    if (!selected) return null;
    const b = bundles.find((x) => x.company.id === selected.companyId);
    const o = b?.options.find((x) => x.id === selected.optionId);
    if (!b || !o) return null;
    return { b, o };
  }, [bundles, selected]);

  return (
    <div className="mx-auto max-w-[960px] px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-navy font-semibold text-lg">LifePort</Link>
        <span className="text-sm text-muted">見積比較</span>
      </div>

      <div className="rounded-xl border border-border bg-white p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-navy text-xl font-semibold">見積比較（会社×日程）</h1>
            <p className="mt-2 text-sm text-muted">
              同一社でも日程で価格が変わる場合があります。価格だけでなく条件・評価も確認できます。
            </p>
          </div>

          <button
            className="text-sm text-muted hover:underline"
            onClick={() => setSort((v) => (v === "recommended" ? "price" : "recommended"))}
          >
            並び替え：{sort === "recommended" ? "おすすめ順" : "価格順"}
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {sorted.map((b) => (
            <QuoteCard key={b.company.id} bundle={b} onChoose={(companyId, optionId) => setSelected({ companyId, optionId })} />
          ))}
        </div>

        {chosen && (
          <div className="mt-6 rounded-xl border border-cyan/30 bg-cyan/10 p-4 text-sm text-navy">
            選択中：<b>{chosen.b.company.name}</b> ／ <b>{chosen.o.label}</b> ／ <b>{formatJPY(chosen.o.price)}</b>
            <div className="mt-2 text-muted">
              （この後、チャット→成約確認→タスク管理へ接続する想定）
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <Link className="inline-flex h-12 items-center justify-center rounded-lg px-4 text-sm font-medium text-navy hover:bg-bg" href="/progress">
            戻る
          </Link>
          <Link className="inline-flex h-12 items-center justify-center rounded-lg border border-navy bg-white px-4 text-sm font-medium text-navy hover:bg-bg" href="/chat">
            チャット（次で実装）
          </Link>
        </div>
      </div>
    </div>
  );
}

function QuoteCard({
  bundle,
  onChoose
}: {
  bundle: QuoteBundle;
  onChoose: (companyId: string, optionId: string) => void;
}) {
  const [active, setActive] = useState(bundle.options[0]?.id ?? "");
  const option = bundle.options.find((o) => o.id === active) ?? bundle.options[0];

  return (
    <div className="rounded-xl border border-border bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-navy font-semibold">{bundle.company.name}</div>
          <div className="text-xs text-muted">評価：★{bundle.rating.toFixed(1)} ／ {bundle.company.note}</div>
        </div>
        <div className="text-sm text-muted">
          最低価格：<span className="text-navy font-semibold">{formatJPY(bundle.basePriceMin)}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {bundle.options.map((o) => {
          const isActive = o.id === active;
          return (
            <button
              key={o.id}
              onClick={() => setActive(o.id)}
              className={[
                "rounded-lg border px-3 py-2 text-left text-sm transition",
                isActive ? "border-cyan bg-[#E0F2FE] text-navy" : "border-border bg-white text-muted hover:bg-bg"
              ].join(" ")}
            >
              <div className="font-medium">{o.label}</div>
              <div className={"text-xs " + (isActive ? "text-navy" : "text-muted")}>{formatJPY(o.price)}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-3 text-sm">
        <div className="rounded-lg border border-border bg-bg p-3">
          <div className="text-muted text-xs">作業員</div>
          <div className="text-navy font-semibold">{option.crew}名</div>
        </div>
        <div className="rounded-lg border border-border bg-bg p-3">
          <div className="text-muted text-xs">ダンボール</div>
          <div className="text-navy font-semibold">{option.boxes}箱</div>
        </div>
        <div className="rounded-lg border border-border bg-bg p-3">
          <div className="text-muted text-xs">保険</div>
          <div className="text-navy font-semibold">{option.insurance}</div>
        </div>
      </div>

      {option.hint && (
        <div className="mt-3 text-xs text-muted">
          <span className="inline-block rounded-full border border-cyan/30 bg-cyan/10 px-2 py-0.5 text-navy">ヒント</span>{" "}
          {option.hint}
        </div>
      )}

      <div className="mt-4 flex gap-2 flex-wrap">
        <button
          className="inline-flex h-12 items-center justify-center rounded-lg border border-navy bg-white px-4 text-sm font-medium text-navy hover:bg-bg"
          onClick={() => alert("詳細は次フェーズ（Overlay想定）")}
        >
          詳細（デモ）
        </button>
        <button
          className="inline-flex h-12 items-center justify-center rounded-lg bg-cyan px-4 text-sm font-medium text-white hover:bg-[#0891B2]"
          onClick={() => onChoose(bundle.company.id, option.id)}
        >
          この日程で決定
        </button>
      </div>
    </div>
  );
}