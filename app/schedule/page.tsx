"use client";

import Link from "next/link";
import { useState } from "react";

const windows = [
  { value: "0", label: "1日指定（幅なし）" },
  { value: "3", label: "前後3日OK（価格が下がる可能性）" },
  { value: "7", label: "前後1週間OK（さらに価格差が出やすい）" },
  { value: "wk", label: "平日ならいつでもOK（最安傾向）" }
] as const;

const times = [
  { value: "am", label: "午前" },
  { value: "pm", label: "午後" },
  { value: "all", label: "終日可（最安傾向）" }
] as const;

export default function SchedulePage() {
  const [primaryDate, setPrimaryDate] = useState("");
  const [win, setWin] = useState<(typeof windows)[number]["value"]>("3");
  const [timeband, setTimeband] = useState<(typeof times)[number]["value"]>("all");
  const [note, setNote] = useState("");

  const canNext = !!primaryDate;

  return (
    <div className="mx-auto max-w-[960px] px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-navy font-semibold text-lg">
          LifePort
        </Link>
        <span className="text-sm text-muted">日程幅</span>
      </div>

      <div className="rounded-xl border border-border bg-white p-6 shadow-soft">
        <h1 className="text-navy text-xl font-semibold">引越し可能な日程を教えてください</h1>
        <p className="mt-2 text-sm text-muted">
          日程に幅を持たせることで、引越会社が効率的な作業ルートを組める場合があり、その分価格が抑えられることがあります。
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block">
            <div className="text-sm text-navy font-medium">第1希望日</div>
            <input
              type="date"
              className="mt-2 w-full h-12 rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-cyan focus:ring-4 focus:ring-cyan/15"
              value={primaryDate}
              onChange={(e) => setPrimaryDate(e.target.value)}
            />
          </label>

          <label className="block">
            <div className="text-sm text-navy font-medium">日程幅</div>
            <select
              className="mt-2 w-full h-12 rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-cyan focus:ring-4 focus:ring-cyan/15"
              value={win}
              onChange={(e) => setWin(e.target.value as any)}
            >
              {windows.map((w) => (
                <option key={w.value} value={w.value}>
                  {w.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <div className="text-sm text-navy font-medium">時間帯</div>
            <select
              className="mt-2 w-full h-12 rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-cyan focus:ring-4 focus:ring-cyan/15"
              value={timeband}
              onChange={(e) => setTimeband(e.target.value as any)}
            >
              {times.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <div className="text-sm text-navy font-medium">補足（任意）</div>
            <input
              className="mt-2 w-full h-12 rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-cyan focus:ring-4 focus:ring-cyan/15"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="例）階段のみ／大型家電あり など"
            />
          </label>
        </div>

        {win !== "0" && (
          <div className="mt-4 rounded-xl border border-cyan/30 bg-cyan/10 p-4 text-sm text-navy">
            日程の幅を広げるほど、引越会社が既存ルートに組み込みやすくなり、価格が抑えられる場合があります。
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <Link
            className="inline-flex h-12 items-center justify-center rounded-lg px-4 text-sm font-medium text-navy hover:bg-bg"
            href="/signup"
          >
            戻る
          </Link>

          <button
            className={[
              "inline-flex h-12 items-center justify-center rounded-lg px-4 text-sm font-medium",
              canNext ? "bg-cyan text-white hover:bg-[#0891B2]" : "bg-border text-muted pointer-events-none"
            ].join(" ")}
            onClick={() => {
              if (!canNext) return;
              localStorage.setItem("lp_primaryDate", primaryDate);
              localStorage.setItem("lp_window", win);
              localStorage.setItem("lp_timeband", timeband);
              localStorage.setItem("lp_note", note);
              window.location.href = "/video";
            }}
            title={!canNext ? "第1希望日を入力してください" : ""}
          >
            次へ（動画ガイド）
          </button>
        </div>
      </div>
    </div>
  );
}