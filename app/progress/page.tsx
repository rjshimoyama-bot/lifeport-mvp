"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { movingCompanies } from "../../lib/mock";

type Status = "pending" | "reviewing" | "submitted";

export default function ProgressPage() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 900);
    return () => clearInterval(t);
  }, []);

  const statuses = useMemo(() => {
    const submittedCount = Math.min(movingCompanies.length, Math.floor(tick / 2));
    return movingCompanies.map((c, i) => {
      const s: Status =
        i < submittedCount ? "submitted" :
        i < submittedCount + 2 ? "reviewing" : "pending";
      return { ...c, status: s };
    });
  }, [tick]);

  const submitted = statuses.filter((s) => s.status === "submitted").length;

  return (
    <div className="mx-auto max-w-[960px] px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-navy font-semibold text-lg">LifePort</Link>
        <span className="text-sm text-muted">進捗</span>
      </div>

      <div className="rounded-xl border border-border bg-white p-6 shadow-soft">
        <h1 className="text-navy text-xl font-semibold">見積進捗</h1>
        <p className="mt-2 text-sm text-muted">参加社数や進捗を可視化して、不安を減らします（デモ）。</p>

        <div className="mt-4 flex gap-2 flex-wrap text-sm">
          <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-navy">提出済 {submitted}社</span>
          <span className="rounded-full border border-border bg-white px-3 py-1 text-muted">検討中 {statuses.filter(s=>s.status==="reviewing").length}社</span>
          <span className="rounded-full border border-border bg-white px-3 py-1 text-muted">未着手 {statuses.filter(s=>s.status==="pending").length}社</span>
        </div>

        <div className="mt-6 space-y-3">
          {statuses.map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-xl border border-border bg-white p-4">
              <div>
                <div className="text-navy font-semibold">{c.name}</div>
                <div className="text-xs text-muted">{c.note}</div>
              </div>
              <div className="text-sm">
                {c.status === "submitted" && <span className="text-green-700 font-medium">提出済</span>}
                {c.status === "reviewing" && <span className="text-amber-700 font-medium">検討中</span>}
                {c.status === "pending" && <span className="text-muted">未提出</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <Link className="inline-flex h-12 items-center justify-center rounded-lg px-4 text-sm font-medium text-navy hover:bg-bg" href="/upload">
            戻る
          </Link>
          <Link className="inline-flex h-12 items-center justify-center rounded-lg bg-cyan px-4 text-sm font-medium text-white hover:bg-[#0891B2]" href="/quotes">
            見積比較へ
          </Link>
        </div>
      </div>
    </div>
  );
}