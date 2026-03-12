"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const canNext = name.trim() && email.trim() && phone.trim();

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1120px] px-4 py-6 md:px-6 md:py-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-navy">
            Movis
          </Link>
          <span className="text-sm text-muted">見積もり開始</span>
        </header>

        <section className="mt-8">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-soft md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.8fr]">
              <div>
                <div className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-navy">
                  STEP 1
                </div>

                <h1 className="mt-4 text-2xl font-bold text-navy md:text-3xl">
                  まずは基本情報を入力
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted md:text-base">
                  Movisでは、動画査定と見積比較をスムーズに進めるために、
                  最初にお名前・メール・電話番号をご入力いただきます。
                </p>

                <div className="mt-6 rounded-2xl border border-cyan/30 bg-cyan/10 p-5">
                  <div className="text-sm font-semibold text-navy">Movisの安心設計</div>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    <li>・電話番号は契約成立まで引越会社に公開されません</li>
                    <li>・見積もり比較に必要な範囲でのみ情報を利用します</li>
                    <li>・無理な営業電話を前提としない設計です</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-bg p-5 md:p-6">
                <div className="text-lg font-bold text-navy">基本情報の入力</div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  入力は約1分で完了します。
                </p>

                <div className="mt-6 space-y-4">
                  <label className="block">
                    <div className="text-sm font-semibold text-navy">お名前</div>
                    <input
                      className="mt-2 h-12 w-full rounded-xl border border-border bg-white px-4 text-sm text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/15"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="例）下山 恒一"
                    />
                  </label>

                  <label className="block">
                    <div className="text-sm font-semibold text-navy">メールアドレス</div>
                    <input
                      type="email"
                      className="mt-2 h-12 w-full rounded-xl border border-border bg-white px-4 text-sm text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/15"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@company.com"
                    />
                  </label>

                  <label className="block">
                    <div className="text-sm font-semibold text-navy">電話番号</div>
                    <input
                      type="tel"
                      className="mt-2 h-12 w-full rounded-xl border border-border bg-white px-4 text-sm text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/15"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="090-1234-5678"
                    />
                  </label>
                </div>

                <div className="mt-6 rounded-xl border border-border bg-white p-4">
                  <div className="text-xs font-semibold text-muted">次のステップ</div>
                  <div className="mt-1 text-sm font-medium text-navy">
                    日程幅と引越し条件を入力して、動画査定へ進みます
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/"
                    className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-navy hover:bg-white/80"
                  >
                    戻る
                  </Link>

                  <Link
                    href="/schedule"
                    className={[
                      "inline-flex h-12 items-center justify-center rounded-lg px-5 text-sm font-semibold transition",
                      canNext
                        ? "bg-cyan text-white hover:bg-[#0891B2]"
                        : "pointer-events-none bg-border text-muted"
                    ].join(" ")}
                  >
                    次へ進む
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
