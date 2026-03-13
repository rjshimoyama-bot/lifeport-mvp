"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Message = {
  id: number;
  sender: "user" | "company" | "system";
  text: string;
  time: string;
};

const QUICK_QUESTIONS = [
  "ダンボールは何箱まで無料ですか？",
  "午前便と午後便で料金は変わりますか？",
  "洗濯機の取り外しは対応できますか？",
  "当日の到着時間の目安を教えてください。",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "system",
      text: "Movisチャットへようこそ。見積もり内容の確認や、条件のすり合わせにご利用いただけます。",
      time: "10:00",
    },
    {
      id: 2,
      sender: "company",
      text: "ご検討ありがとうございます。ご不明点があればお気軽にご質問ください。",
      time: "10:01",
    },
  ]);

  const [input, setInput] = useState("");

  const canSend = input.trim().length > 0;

  const selectedSummary = useMemo(() => {
  if (typeof window === "undefined") {
    return {
      company: "未選択",
      plan: "-",
      price: "-",
    };
  }

  const saved = localStorage.getItem("movis_selected_quote");
  if (!saved) {
    return {
      company: "未選択",
      plan: "-",
      price: "-",
    };
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      company: parsed.company || "未選択",
      plan: parsed.plan || "-",
      price: parsed.price || "-",
    };
  } catch {
    return {
      company: "未選択",
      plan: "-",
      price: "-",
    };
  }
}, []);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const nextUserMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
      time: new Date().toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const nextCompanyMessage: Message = {
      id: Date.now() + 1,
      sender: "company",
      text: "ありがとうございます。担当に確認のうえ、回答いたします。（デモ）",
      time: new Date().toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, nextUserMessage, nextCompanyMessage]);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1120px] px-4 py-6 md:px-6 md:py-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-navy">
            Movis
          </Link>
          <span className="text-sm text-muted">チャット確認</span>
        </header>

        <section className="mt-8">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-soft md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-4">
                <div className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-navy">
                  STEP 5
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-navy md:text-3xl">
                    気になる会社にチャットで確認
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-muted md:text-base">
                    Movisでは、電話ではなくチャットで条件確認ができます。
                    見積もり内容や追加条件を確認したうえで、納得して依頼できます。
                  </p>
                </div>

                <div className="rounded-2xl border border-cyan/30 bg-cyan/10 p-5">
                  <div className="text-sm font-semibold text-navy">選択中の見積もり</div>
                  <div className="mt-4 space-y-3">
                    <SummaryRow label="会社" value={selectedSummary.company} />
                    <SummaryRow label="日程" value={selectedSummary.plan} />
                    <SummaryRow label="料金" value={selectedSummary.price} />
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-bg p-5">
                  <div className="text-sm font-semibold text-navy">Movisのチャット設計</div>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    <li>・電話番号は契約成立まで公開されません</li>
                    <li>・条件確認をテキストで残せます</li>
                    <li>・比較した上で安心して依頼できます</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-white p-5">
                  <div className="text-sm font-semibold text-navy">よくある確認内容</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {QUICK_QUESTIONS.map((question) => (
                      <button
                        key={question}
                        className="rounded-full border border-border bg-bg px-3 py-2 text-xs font-medium text-navy hover:bg-white"
                        onClick={() => sendMessage(question)}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-bg p-4 md:p-5">
                <div className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3">
                  <div>
                    <div className="text-sm font-semibold text-navy">A社（おすすめ）</div>
                    <div className="text-xs text-muted">見積内容の確認チャット</div>
                  </div>
                  <div className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-navy">
                    デモ
                  </div>
                </div>

                <div className="mt-4 h-[420px] overflow-y-auto rounded-2xl border border-border bg-white p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="flex flex-col">
                        {message.sender === "system" ? (
                          <div className="mx-auto max-w-[90%] rounded-xl border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm leading-6 text-navy">
                            {message.text}
                          </div>
                        ) : message.sender === "company" ? (
                          <div className="mr-auto max-w-[85%] rounded-2xl rounded-tl-sm border border-border bg-bg px-4 py-3 text-sm leading-6 text-navy">
                            {message.text}
                            <div className="mt-2 text-right text-[11px] text-muted">
                              {message.time}
                            </div>
                          </div>
                        ) : (
                          <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-cyan px-4 py-3 text-sm leading-6 text-white">
                            {message.text}
                            <div className="mt-2 text-right text-[11px] text-white/80">
                              {message.time}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-border bg-white p-4">
                  <div className="text-xs font-semibold text-muted">メッセージ入力</div>

                  <textarea
                    className="mt-3 min-h-[110px] w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/15"
                    placeholder="気になる点を入力してください"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
                    <Link
                      href="/quotes"
                      className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-navy hover:bg-white/80"
                    >
                      見積比較に戻る
                    </Link>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        className={[
                          "inline-flex h-12 items-center justify-center rounded-lg px-5 text-sm font-semibold transition",
                          canSend
                            ? "bg-cyan text-white hover:bg-[#0891B2]"
                            : "pointer-events-none bg-border text-muted"
                        ].join(" ")}
                        onClick={() => sendMessage(input)}
                      >
                        送信する
                      </button>

                      <Link
                        href="/confirm"
                        className="inline-flex h-12 items-center justify-center rounded-lg border border-navy bg-white px-5 text-sm font-semibold text-navy hover:bg-bg"
                      >
                        この内容で進む
                      </Link>
                    </div>
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

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/60 bg-white px-4 py-3">
      <div className="text-xs font-semibold text-muted">{label}</div>
      <div className="text-sm font-semibold text-navy">{value}</div>
    </div>
  );
}
