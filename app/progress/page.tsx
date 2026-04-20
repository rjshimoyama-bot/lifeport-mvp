"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type LatestVideoMeta = {
  id: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
  size: number;
};

type ProgressCompany = {
  id: string;
  name: string;
  status: "受付済み" | "動画確認中" | "見積作成中" | "提出完了";
  eta: string;
};

const mockCompanies: ProgressCompany[] = [
  {
    id: "c1",
    name: "サクラ引越センター",
    status: "動画確認中",
    eta: "本日中に見積予定",
  },
  {
    id: "c2",
    name: "ミライ運送",
    status: "見積作成中",
    eta: "まもなく提示予定",
  },
  {
    id: "c3",
    name: "スマートムーブ",
    status: "受付済み",
    eta: "順次確認予定",
  },
];

export default function ProgressPage() {
  const [videoMeta, setVideoMeta] = useState<LatestVideoMeta | null>(null);
  const [companies, setCompanies] = useState<ProgressCompany[]>(mockCompanies);

  useEffect(() => {
    const meta = localStorage.getItem("movis_latest_video_meta");
    if (meta) {
      try {
        setVideoMeta(JSON.parse(meta));
      } catch {
        // noop
      }
    }
  }, []);

  useEffect(() => {
    if (!videoMeta) return;

    setCompanies([
      {
        id: "c1",
        name: "サクラ引越センター",
        status: "動画確認中",
        eta: "動画確認後に見積提示",
      },
      {
        id: "c2",
        name: "ミライ運送",
        status: "見積作成中",
        eta: "条件整理後に提示予定",
      },
      {
        id: "c3",
        name: "スマートムーブ",
        status: "受付済み",
        eta: "受付完了・順次確認",
      },
    ]);
  }, [videoMeta]);

  const uploadedLabel = useMemo(() => {
    if (!videoMeta) return "未アップロード";
    return "アップロード済み";
  }, [videoMeta]);

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1120px] px-4 py-6 md:px-6 md:py-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-navy">
            Movis
          </Link>
          <span className="text-sm text-muted">見積進捗</span>
        </header>

        <section className="mt-8">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-soft md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <div className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-navy">
                  STEP 5
                </div>

                <h1 className="mt-4 text-2xl font-bold text-navy md:text-3xl">
                  見積もりの進捗を確認
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted md:text-base">
                  アップロードされた動画を各引越会社が確認し、順次見積を作成しています。
                  動画登録が完了していれば、各社はその内容を前提に見積提示へ進みます。
                </p>

                <div className="mt-6 rounded-2xl border border-cyan/30 bg-cyan/10 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-navy">動画アップロード状況</div>
                      <div className="mt-2 text-2xl font-bold text-navy">{uploadedLabel}</div>
                    </div>

                    <span
                      className={[
                        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
                        videoMeta
                          ? "border-green-300 bg-green-50 text-green-700"
                          : "border-border bg-white text-muted",
                      ].join(" ")}
                    >
                      {videoMeta ? "見積依頼に利用中" : "未登録"}
                    </span>
                  </div>

                  {videoMeta ? (
                    <div className="mt-4 rounded-xl border border-white/60 bg-white p-4">
                      <div className="text-xs text-muted">登録済み動画</div>
                      <div className="mt-2 text-sm font-semibold text-navy">
                        {videoMeta.fileName}
                      </div>
                      <div className="mt-1 text-xs leading-5 text-muted">
                        保存サイズ：約{Math.round((videoMeta.size / 1024 / 1024) * 100) / 100} MB
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-xl border border-border bg-white p-4 text-sm text-muted">
                      まだ動画が登録されていません。動画を撮影・保存すると、引越会社の見積確認が始まります。
                    </div>
                  )}

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/video"
                      className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-white px-4 text-sm font-semibold text-navy hover:bg-bg"
                    >
                      動画撮影へ戻る
                    </Link>
                    <Link
                      href="/upload"
                      className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-white px-4 text-sm font-semibold text-navy hover:bg-bg"
                    >
                      動画アップロード画面へ
                    </Link>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-bg p-5">
                  <div className="text-sm font-semibold text-navy">Movis上の現在ステータス</div>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <StatusMini title="動画登録" value={videoMeta ? "完了" : "未完了"} />
                    <StatusMini title="会社受付" value="進行中" />
                    <StatusMini title="見積提示" value="準備中" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-bg p-5">
                <div className="text-lg font-bold text-navy">引越会社ごとの進捗</div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  動画が登録済みの場合、各社が内容確認を進めながら見積を作成します。
                </p>

                <div className="mt-5 space-y-3">
                  {companies.map((company) => (
                    <div
                      key={company.id}
                      className="rounded-2xl border border-border bg-white p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-bold text-navy">{company.name}</div>
                          <div className="mt-1 text-xs text-muted">{company.eta}</div>
                        </div>
                        <ProgressBadge status={company.status} />
                      </div>

                      <div className="mt-4 rounded-xl border border-cyan/20 bg-cyan/5 px-3 py-2 text-xs text-muted">
                        {videoMeta
                          ? "動画アップロード済みのため、この会社は動画内容を前提に確認を進めています。"
                          : "動画未登録のため、見積確認に進めていません。"}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/upload"
                    className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-navy hover:bg-white/80"
                  >
                    動画を再登録する
                  </Link>

                  <Link
                    href="/quotes"
                    className="inline-flex h-12 items-center justify-center rounded-lg bg-cyan px-5 text-sm font-semibold text-white transition hover:bg-[#0891B2]"
                  >
                    見積比較へ進む
                  </Link>
                </div>

                <div className="mt-4 text-xs text-muted">
                  デモでは進捗表示ですが、実運用では会社別の見積到着状況が更新されます。
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatusMini({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/60 bg-white p-4">
      <div className="text-xs text-muted">{title}</div>
      <div className="mt-1 text-sm font-semibold text-navy">{value}</div>
    </div>
  );
}

function ProgressBadge({
  status,
}: {
  status: "受付済み" | "動画確認中" | "見積作成中" | "提出完了";
}) {
  if (status === "提出完了") {
    return (
      <span className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-navy">
        提出完了
      </span>
    );
  }

  if (status === "見積作成中") {
    return (
      <span className="inline-flex rounded-full border border-green-300 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
        見積作成中
      </span>
    );
  }

  if (status === "動画確認中") {
    return (
      <span className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
        動画確認中
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-muted">
      受付済み
    </span>
  );
}
