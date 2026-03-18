"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SelectedQuote = {
  company: string;
  plan: string;
  price: string;
  crew: string;
  truck: string;
  insurance: string;
  note: string;
};

export default function ConfirmPage() {
  const [selectedQuote, setSelectedQuote] = useState<SelectedQuote>({
    company: "未選択",
    plan: "-",
    price: "-",
    crew: "-",
    truck: "-",
    insurance: "-",
    note: "見積もり内容を確認してください。",
  });

  useEffect(() => {
    const saved = localStorage.getItem("movis_selected_quote");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as SelectedQuote;
      setSelectedQuote(parsed);
    } catch {
      // noop
    }
  }, []);

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1120px] px-4 py-6 md:px-6 md:py-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-navy">
            Movis
          </Link>
          <span className="text-sm text-muted">契約確認</span>
        </header>

        <section className="mt-8">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-soft md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-4">
                <div className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-navy">
                  STEP 6
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-navy md:text-3xl">
                    見積内容を確認して依頼へ進む
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-muted md:text-base">
                    チャットで確認した内容をもとに、依頼する引越会社と条件を最終確認します。
                    内容に問題がなければ、このまま発注情報連携へ進めます。
                  </p>
                </div>

                <div className="rounded-2xl border border-cyan/30 bg-cyan/10 p-5">
                  <div className="text-sm font-semibold text-navy">Movisの確認ポイント</div>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    <li>・価格だけでなく条件も確認したうえで依頼できます</li>
                    <li>・電話番号は発注確定後に共有されます</li>
                    <li>・次の画面で発注先へ連携する情報を最終確認します</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-bg p-5">
                  <div className="text-sm font-semibold text-navy">今回の選定メモ</div>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {selectedQuote.note}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-bg p-4 md:p-5">
                <div className="rounded-xl border border-border bg-white px-4 py-3">
                  <div className="text-lg font-bold text-navy">依頼内容の確認</div>
                  <div className="mt-1 text-sm text-muted">
                    この内容で発注情報連携へ進みます
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <ConfirmRow label="引越会社" value={selectedQuote.company} />
                  <ConfirmRow label="プラン" value={selectedQuote.plan} />
                  <ConfirmRow label="料金" value={selectedQuote.price} />
                  <ConfirmRow label="作業員" value={selectedQuote.crew} />
                  <ConfirmRow label="トラック" value={selectedQuote.truck} />
                  <ConfirmRow label="保険" value={selectedQuote.insurance} />
                </div>

                <div className="mt-5 rounded-2xl border border-border bg-white p-5">
                  <div className="text-sm font-semibold text-navy">契約前のご案内</div>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    <li>・最終的な詳細条件は引越会社との確認により確定します</li>
                    <li>・追加作業がある場合は別途料金が発生する場合があります</li>
                    <li>・次の画面で電話番号を含む発注情報を連携します</li>
                  </ul>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/chat"
                    className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-navy hover:bg-white/80"
                  >
                    チャットに戻る
                  </Link>

                  <Link
                    href="/handoff"
                    className="inline-flex h-12 items-center justify-center rounded-lg bg-cyan px-5 text-sm font-semibold text-white transition hover:bg-[#0891B2]"
                  >
                    発注情報連携へ進む
                  </Link>
                </div>

                <div className="mt-4 text-center text-xs text-muted">
                  デモでは、次の画面で電話番号を含む連携確認を行います。
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ConfirmRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-4">
      <div className="text-xs font-semibold text-muted">{label}</div>
      <div className="text-sm font-semibold text-navy">{value}</div>
    </div>
  );
}
