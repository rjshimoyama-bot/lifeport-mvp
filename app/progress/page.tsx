"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { movingCompanies } from "../../lib/mock";

type Status = "pending" | "reviewing" | "submitted";

export default function ProgressPage() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 900);

    return () => clearInterval(timer);
  }, []);

  const statuses = useMemo(() => {
    const submittedCount = Math.min(movingCompanies.length, Math.floor(tick / 2));

    return movingCompanies.map((company, index) => {
      const status: Status =
        index < submittedCount
          ? "submitted"
          : index < submittedCount + 2
          ? "reviewing"
          : "pending";

      return {
        ...company,
        status,
      };
    });
  }, [tick]);

  const submitted = statuses.filter((s) => s.status === "submitted").length;
  const reviewing = statuses.filter((s) => s.status === "reviewing").length;
  const pending = statuses.filter((s) => s.status === "pending").length;

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
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-navy">
                  STEP 4
                </div>

                <h1 className="mt-4 text-2xl font-bold text-navy md:text-3xl">
                  見積もりを収集中です
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted md:text-base">
                  Movis AI が動画情報を整理し、各引越会社が見積もりを作成しています。
                  複数社の価格と条件がそろい次第、比較画面に進めます。
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <StatCard label="提出済み" value={`${submitted}社`} tone="cyan" />
                  <StatCard label="確認中" value={`${reviewing}社`} tone="amber" />
                  <StatCard label="未提出" value={`${pending}社`} tone="gray" />
                </div>

                <div className="mt-6 rounded-2xl border border-cyan/30 bg-cyan/10 p-5">
                  <div className="text-sm font-semibold text-navy">Movis AI 処理内容</div>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <FlowMini title="動画確認" text="アップロードされた動画を受信" />
                    <FlowMini title="荷物量整理" text="物量や条件を整理" />
                    <FlowMini title="見積依頼" text="参加会社へ一括配信" />
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-bg p-5">
                  <div className="text-sm font-semibold text-navy">ユーザー向けの見え方</div>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    <li>・どの会社が見積中かを確認できます</li>
                    <li>・価格だけでなく条件も比較できます</li>
                    <li>・日程による価格差も確認できます</li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="rounded-2xl border border-border bg-bg p-5 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-navy">参加会社の進捗</div>
                    <div className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-navy">
                      リアルタイム表示（デモ）
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {statuses.map((company) => (
                      <div
                        key={company.id}
                        className="rounded-xl border border-border bg-white p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold text-navy">
                              {company.name}
                            </div>
                            <div className="mt-1 text-xs leading-5 text-muted">
                              {company.note}
                            </div>
                          </div>

                          <StatusBadge status={company.status} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-xl border border-border bg-white p-4">
                    <div className="text-xs font-semibold text-muted">次のステップ</div>
                    <div className="mt-1 text-sm font-medium text-navy">
                      各社の見積もりがそろったら、価格と条件を比較できます
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/upload"
                      className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-navy hover:bg-white/80"
                    >
                      戻る
                    </Link>

                    <Link
                      href="/quotes"
                      className="inline-flex h-12 items-center justify-center rounded-lg bg-cyan px-5 text-sm font-semibold text-white transition hover:bg-[#0891B2]"
                    >
                      見積比較へ進む
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "cyan" | "amber" | "gray";
}) {
  const toneClass =
    tone === "cyan"
      ? "border-cyan/30 bg-cyan/10 text-navy"
      : tone === "amber"
      ? "border-amber-300 bg-amber-50 text-amber-800"
      : "border-border bg-white text-navy";

  return (
    <div className={`rounded-xl border p-4 ${toneClass}`}>
      <div className="text-xs font-semibold opacity-80">{label}</div>
      <div className="mt-1 text-xl font-bold">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  if (status === "submitted") {
    return (
      <span className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-navy">
        提出済み
      </span>
    );
  }

  if (status === "reviewing") {
    return (
      <span className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
        確認中
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-muted">
      未提出
    </span>
  );
}

function FlowMini({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-white/60 bg-white p-4">
      <div className="text-sm font-semibold text-navy">{title}</div>
      <div className="mt-2 text-xs leading-5 text-muted">{text}</div>
    </div>
  );
}
