"use client";

import Link from "next/link";
import { useState } from "react";

export default function HandoffPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const submit = () => {
    if (!name || !phone) {
      alert("氏名と電話番号は必須です");
      return;
    }

    const selectedQuote = JSON.parse(
      localStorage.getItem("movis_selected_quote") || "null"
    );

    const orders = JSON.parse(
      localStorage.getItem("movis_confirmed_orders") || "[]"
    );

    const newOrder = {
      id: `ORD-${Date.now()}`,
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      company: selectedQuote?.company || "未選択",
      plan: selectedQuote?.plan || "-",
      price: selectedQuote?.price || "-",
      crew: selectedQuote?.crew || "-",
      truck: selectedQuote?.truck || "-",
      insurance: selectedQuote?.insurance || "-",
      status: "連携済み",
      handoffAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "movis_confirmed_orders",
      JSON.stringify([...orders, newOrder])
    );

    alert("引越会社へ連携しました");

    window.location.href = "/tasks";
  };

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[800px] px-4 py-10">
        <h1 className="text-2xl font-bold text-navy">
          電話番号の連携
        </h1>

        <p className="mt-2 text-sm text-muted">
          発注確定後にのみ、引越会社へ連絡先を公開します。
        </p>

        <div className="mt-6 space-y-4">
          <input
            placeholder="氏名"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 px-4 border rounded"
          />

          <input
            placeholder="電話番号"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-12 px-4 border rounded"
          />

          <input
            placeholder="メール（任意）"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 border rounded"
          />
        </div>

        <button
          onClick={submit}
          className="mt-6 w-full h-12 bg-cyan text-white rounded"
        >
          連携して次へ
        </button>

        <Link href="/confirm" className="block mt-4 text-sm text-muted">
          ← 戻る
        </Link>
      </div>
    </main>
  );
}
