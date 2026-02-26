"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const canNext = name.trim() && email.trim() && phone.trim();

  return (
    <div className="mx-auto max-w-[960px] px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-navy font-semibold text-lg">LifePort</Link>
        <span className="text-sm text-muted">登録</span>
      </div>

      <div className="rounded-xl border border-border bg-white p-6 shadow-soft">
        <h1 className="text-navy text-xl font-semibold">登録（約1分）</h1>
        <p className="mt-2 text-sm text-muted">※電話番号は成約後まで引越会社に公開されません。</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block">
            <div className="text-sm text-navy font-medium">お名前</div>
            <input
              className="mt-2 w-full h-12 rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-cyan focus:ring-4 focus:ring-cyan/15"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例）下山 恒一"
            />
          </label>

          <label className="block">
            <div className="text-sm text-navy font-medium">メール</div>
            <input
              className="mt-2 w-full h-12 rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-cyan focus:ring-4 focus:ring-cyan/15"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@company.com"
            />
          </label>

          <label className="block md:col-span-2">
            <div className="text-sm text-navy font-medium">電話番号（非公開）</div>
            <input
              className="mt-2 w-full h-12 rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-cyan focus:ring-4 focus:ring-cyan/15"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="090-XXXX-XXXX"
            />
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            className="inline-flex h-12 items-center justify-center rounded-lg px-4 text-sm font-medium text-navy hover:bg-bg"
            href="/"
          >
            戻る
          </Link>

          <Link
            className={[
              "inline-flex h-12 items-center justify-center rounded-lg px-4 text-sm font-medium",
              canNext ? "bg-cyan text-white hover:bg-[#0891B2]" : "bg-border text-muted pointer-events-none"
            ].join(" ")}
            href="/schedule"
            title={!canNext ? "必須項目を入力してください" : ""}
          >
            次へ（日程幅）
          </Link>
        </div>
      </div>
    </div>
  );
}