"use client";

import { useMemo } from "react";
import Link from "next/link";

export default function TasksPage() {
  const selectedQuote = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const saved = localStorage.getItem("movis_selected_quote");
    if (!saved) return null;

    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }, []);

  const tasks = [
    "引越会社との最終確認",
    "荷造り開始",
    "ライフライン手続き",
    "住所変更",
    "引越当日の準備",
  ];

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[900px] px-4 py-8">

        <header className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-navy">
            Movis
          </Link>
          <span className="text-sm text-muted">
            引越し準備
          </span>
        </header>

        <section className="mt-8">

          <h1 className="text-2xl font-bold text-navy">
            引越し準備タスク
          </h1>

          {selectedQuote && (
            <div className="mt-6 rounded-xl border border-border bg-white p-5">
              <div className="text-sm text-muted">
                依頼した引越会社
              </div>

              <div className="text-lg font-semibold text-navy mt-1">
                {selectedQuote.company}
              </div>

              <div className="text-sm text-muted mt-1">
                {selectedQuote.plan} / {selectedQuote.price}
              </div>
            </div>
          )}

          <div className="mt-6 space-y-4">
            {tasks.map((task, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-white p-4 flex items-center justify-between"
              >
                <span className="text-sm text-navy">
                  {task}
                </span>

                <input type="checkbox" />
              </div>
            ))}
          </div>

        </section>
      </div>
    </main>
  );
}
