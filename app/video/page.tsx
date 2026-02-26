"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Room = {
  key: string;
  title: string;
  checks: string[];
};

const ROOMS: Room[] = [
  { key: "entrance", title: "玄関", checks: ["下駄箱の中", "廊下収納があれば中まで"] },
  { key: "living", title: "リビング", checks: ["大型家具（ソファ/TV台）を接写", "床面積が分かるように引きで"] },
  { key: "bed", title: "寝室", checks: ["ベッド/タンスを接写", "クローゼット内部"] },
  { key: "kitchen", title: "キッチン", checks: ["冷蔵庫/棚を接写", "食器棚があれば内部"] }
];

export default function VideoPage() {
  const [idx, setIdx] = useState(0);
  const [roomChecks, setRoomChecks] = useState<Record<string, Record<string, boolean>>>({});

  const room = ROOMS[idx];
  const total = ROOMS.length;
  const pct = Math.round(((idx + 1) / total) * 100);

  const checksForRoom = roomChecks[room.key] ?? {};
  const allChecked = useMemo(
    () => room.checks.every((c) => checksForRoom[c] === true),
    [room.checks, checksForRoom]
  );

  const toggle = (label: string, checked: boolean) => {
    setRoomChecks((prev) => ({
      ...prev,
      [room.key]: { ...(prev[room.key] ?? {}), [label]: checked }
    }));
  };

  return (
    <div className="mx-auto max-w-[960px] px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-navy font-semibold text-lg">LifePort</Link>
        <span className="text-sm text-muted">動画ガイド</span>
      </div>

      <div className="rounded-xl border border-border bg-white p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-navy text-xl font-semibold">動画撮影ガイド（目安3〜5分）</h1>
            <p className="mt-2 text-sm text-muted">
              ガイドに沿って撮影してください。途中保存・撮り直しも可能な想定です（この画面はMVPの擬似動作）。
            </p>
          </div>
          <div className="text-sm text-muted">進捗：{idx + 1}/{total}</div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-border">
            <div className="h-2 rounded-full bg-cyan" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Room Card */}
        <div className="mt-6 rounded-xl border border-border bg-white p-5">
          <div className="text-navy font-semibold">{room.title} を撮影してください</div>
          <div className="mt-2 text-sm text-muted">
            各部屋は30秒程度でOK。ゆっくり映して、収納内部も忘れずに。
          </div>

          <div className="mt-4 space-y-3">
            {room.checks.map((c) => (
              <label key={c} className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-[#06B6D4]"
                  checked={checksForRoom[c] === true}
                  onChange={(e) => toggle(c, e.target.checked)}
                />
                <span className="text-sm text-navy">{c}</span>
              </label>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              className="inline-flex h-12 items-center justify-center rounded-lg border border-navy bg-white px-4 text-sm font-medium text-navy hover:bg-bg"
              onClick={() => alert("MVPではカメラ起動は省略。実運用ではスマホ撮影UIを実装します。")}
            >
              撮影する（デモ）
            </button>

            <button
              className="inline-flex h-12 items-center justify-center rounded-lg px-4 text-sm font-medium text-navy hover:bg-bg"
              onClick={() => alert("一時保存しました（デモ）。実運用では下書き保存を実装します。")}
            >
              一時保存（デモ）
            </button>
          </div>

          {!allChecked && (
            <div className="mt-4 text-sm text-muted">
              ※この部屋のチェックが完了すると「次の部屋へ」が押せます。
            </div>
          )}
        </div>

        {/* Nav */}
        <div className="mt-6 flex justify-between gap-3">
          <Link className="inline-flex h-12 items-center justify-center rounded-lg px-4 text-sm font-medium text-navy hover:bg-bg" href="/schedule">
            戻る
          </Link>

          <div className="flex gap-3">
            <button
              className={[
                "inline-flex h-12 items-center justify-center rounded-lg border border-navy bg-white px-4 text-sm font-medium text-navy hover:bg-bg",
                idx === 0 ? "opacity-50 pointer-events-none" : ""
              ].join(" ")}
              onClick={() => setIdx((v) => Math.max(0, v - 1))}
            >
              前の部屋
            </button>

            {idx < total - 1 ? (
              <button
                className={[
                  "inline-flex h-12 items-center justify-center rounded-lg px-4 text-sm font-medium",
                  allChecked ? "bg-cyan text-white hover:bg-[#0891B2]" : "bg-border text-muted pointer-events-none"
                ].join(" ")}
                onClick={() => setIdx((v) => Math.min(total - 1, v + 1))}
                title={!allChecked ? "チェックを完了してください" : ""}
              >
                次の部屋へ
              </button>
            ) : (
              <Link
                className={[
                  "inline-flex h-12 items-center justify-center rounded-lg px-4 text-sm font-medium",
                  allChecked ? "bg-cyan text-white hover:bg-[#0891B2]" : "bg-border text-muted pointer-events-none"
                ].join(" ")}
                href="/upload"
                title={!allChecked ? "チェックを完了してください" : ""}
              >
                アップロードへ
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}