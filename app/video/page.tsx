"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Room = {
  key: string;
  title: string;
  description: string;
  aiTargets: string[];
  checks: string[];
};

const ROOMS: Room[] = [
  {
    key: "entrance",
    title: "玄関",
    description: "玄関全体と、廊下の幅がわかるようにゆっくり撮影してください。",
    aiTargets: ["靴箱", "廊下幅", "大型荷物", "玄関収納"],
    checks: ["玄関全体が映っている", "廊下や通路の幅がわかる", "大きな荷物があれば映している"],
  },
  {
    key: "living",
    title: "リビング",
    description: "家具がすべて見えるように、部屋を一周するように撮影してください。",
    aiTargets: ["ソファ", "テレビ", "テレビ台", "テーブル", "本棚"],
    checks: ["部屋全体を一周している", "大きな家具が映っている", "床面積がわかるように撮影している"],
  },
  {
    key: "bedroom",
    title: "寝室",
    description: "ベッドやタンス、クローゼットの中までわかるように撮影してください。",
    aiTargets: ["ベッド", "マットレス", "タンス", "衣装ケース", "クローゼット"],
    checks: ["ベッドが映っている", "収納家具が映っている", "クローゼット内部を映している"],
  },
  {
    key: "kitchen",
    title: "キッチン",
    description: "冷蔵庫、棚、食器棚などを中心に撮影してください。",
    aiTargets: ["冷蔵庫", "電子レンジ", "食器棚", "キッチン収納"],
    checks: ["冷蔵庫が映っている", "食器棚や棚が映っている", "キッチン全体がわかる"],
  },
  {
    key: "washroom",
    title: "洗面所",
    description: "洗濯機や収納棚がわかるように撮影してください。",
    aiTargets: ["洗濯機", "乾燥機", "洗面棚"],
    checks: ["洗濯機が映っている", "収納棚が映っている", "スペース全体がわかる"],
  },
  {
    key: "balcony",
    title: "バルコニー・収納",
    description: "バルコニーや外置き荷物、追加の収納スペースがあれば撮影してください。",
    aiTargets: ["物置", "自転車", "段ボール", "外置き家具"],
    checks: ["バルコニーや収納が映っている", "大きな荷物があれば映している", "追加スペースがわかる"],
  },
];

export default function VideoPage() {
  const [idx, setIdx] = useState(0);
  const [roomChecks, setRoomChecks] = useState<Record<string, Record<string, boolean>>>({});

  const room = ROOMS[idx];
  const total = ROOMS.length;
  const progress = Math.round(((idx + 1) / total) * 100);

  const currentChecks = roomChecks[room.key] ?? {};
  const allChecked = useMemo(() => {
    return room.checks.every((item) => currentChecks[item] === true);
  }, [room.checks, currentChecks]);

  const toggleCheck = (label: string, checked: boolean) => {
    setRoomChecks((prev) => ({
      ...prev,
      [room.key]: {
        ...(prev[room.key] ?? {}),
        [label]: checked,
      },
    }));
  };

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1120px] px-4 py-6 md:px-6 md:py-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-navy">
            Movis
          </Link>
          <span className="text-sm text-muted">動画撮影ガイド</span>
        </header>

        <section className="mt-8">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-soft md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <h1 className="text-2xl font-bold text-navy md:text-3xl">
                  3〜5分で完了する、Movis動画査定
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted md:text-base">
                  ガイドに沿って部屋を撮影するだけで、引越し見積もりに必要な情報をまとめて伝えられます。
                  訪問見積もりの代わりに、Movis AIが物量を整理します。
                </p>
              </div>

              <div className="rounded-xl border border-cyan/30 bg-cyan/10 px-4 py-3">
                <div className="text-xs text-muted">撮影ステップ</div>
                <div className="mt-1 text-lg font-bold text-navy">
                  {idx + 1} / {total}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="h-2 w-full rounded-full bg-border">
                <div
                  className="h-2 rounded-full bg-cyan transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-muted">進行状況 {progress}%</div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
              <div className="rounded-2xl border border-border bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan/10 text-sm font-bold text-cyan">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-navy">{room.title}</div>
                    <div className="text-sm text-muted">このエリアを撮影してください</div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-muted">
                  {room.description}
                </p>

                <div className="mt-5 rounded-xl border border-border bg-bg p-4">
                  <div className="text-sm font-semibold text-navy">Movis AI が見ているポイント</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {room.aiTargets.map((target) => (
                      <span
                        key={target}
                        className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-medium text-navy"
                      >
                        {target}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-border bg-bg p-4">
                  <div className="text-sm font-semibold text-navy">撮影チェック</div>
                  <div className="mt-3 space-y-3">
                    {room.checks.map((item) => (
                      <label key={item} className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1 h-5 w-5 accent-[#06B6D4]"
                          checked={currentChecks[item] === true}
                          onChange={(e) => toggleCheck(item, e.target.checked)}
                        />
                        <span className="text-sm leading-6 text-navy">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    className="inline-flex h-12 items-center justify-center rounded-lg border border-navy bg-white px-5 text-sm font-semibold text-navy hover:bg-bg"
                    onClick={() =>
                      alert("MVPではカメラ起動は省略しています。実運用ではスマホでそのまま撮影できるようにします。")
                    }
                  >
                    撮影する（デモ）
                  </button>

                  <button
                    className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-navy hover:bg-bg"
                    onClick={() =>
                      alert("一時保存しました（デモ）。実運用では途中保存して後から再開できます。")
                    }
                  >
                    一時保存
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-cyan/30 bg-cyan/10 p-5">
                  <div className="text-sm font-semibold text-navy">撮影の目安</div>
                  <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    <div>・全体で約3〜5分</div>
                    <div>・1部屋あたり30秒前後</div>
                    <div>・家具がすべて見えるようにゆっくり撮影</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-white p-5">
                  <div className="text-sm font-semibold text-navy">Movis AI査定イメージ</div>
                  <div className="mt-4 space-y-3">
                    <AiBox title="荷物量" value="標準〜やや多め" />
                    <AiBox title="想定作業人数" value="2名" />
                    <AiBox title="想定トラック" value="2tクラス" />
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-white p-5">
                  <div className="text-sm font-semibold text-navy">撮影のコツ</div>
                  <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    <div>・部屋を一周するように撮る</div>
                    <div>・大型家具は近づいて撮る</div>
                    <div>・収納の中も簡単に映す</div>
                  </div>
                </div>
              </div>
            </div>

            {!allChecked && (
              <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
                このステップのチェックが完了すると、次の部屋へ進めます。
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Link
                href="/schedule"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-navy hover:bg-bg"
              >
                戻る
              </Link>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  className={[
                    "inline-flex h-12 items-center justify-center rounded-lg border border-navy bg-white px-5 text-sm font-semibold text-navy hover:bg-bg",
                    idx === 0 ? "pointer-events-none opacity-40" : "",
                  ].join(" ")}
                  onClick={() => setIdx((prev) => Math.max(0, prev - 1))}
                >
                  前のステップ
                </button>

                {idx < total - 1 ? (
                  <button
                    className={[
                      "inline-flex h-12 items-center justify-center rounded-lg px-5 text-sm font-semibold",
                      allChecked
                        ? "bg-cyan text-white hover:bg-[#0891B2]"
                        : "pointer-events-none bg-border text-muted",
                    ].join(" ")}
                    onClick={() => setIdx((prev) => Math.min(total - 1, prev + 1))}
                  >
                    次の部屋へ
                  </button>
                ) : (
                  <Link
                    href="/upload"
                    className={[
                      "inline-flex h-12 items-center justify-center rounded-lg px-5 text-sm font-semibold",
                      allChecked
                        ? "bg-cyan text-white hover:bg-[#0891B2]"
                        : "pointer-events-none bg-border text-muted",
                    ].join(" ")}
                  >
                    アップロードへ進む
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function AiBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-bg p-3">
      <div className="text-xs text-muted">{title}</div>
      <div className="mt-1 text-sm font-semibold text-navy">{value}</div>
    </div>
  );
}
