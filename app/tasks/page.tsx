"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Task = {
  id: number;
  title: string;
  category: "before" | "lifeline" | "address" | "movingday";
  description: string;
  done: boolean;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "引越会社を確定する",
    category: "before",
    description: "比較した見積もりの中から、依頼先を決定します。",
    done: true,
  },
  {
    id: 2,
    title: "荷造りを始める",
    category: "before",
    description: "日常的に使わないものから順に梱包を始めます。",
    done: false,
  },
  {
    id: 3,
    title: "電気・ガス・水道の手続きを確認する",
    category: "lifeline",
    description: "停止・開始の手続きが必要なライフラインを確認します。",
    done: false,
  },
  {
    id: 4,
    title: "インターネット回線の移転手続きを確認する",
    category: "lifeline",
    description: "現在の回線契約を引越先で継続できるか確認します。",
    done: false,
  },
  {
    id: 5,
    title: "住所変更が必要なものを整理する",
    category: "address",
    description: "郵便、銀行、クレジットカード、各種会員情報などを確認します。",
    done: false,
  },
  {
    id: 6,
    title: "転出・転入手続きを確認する",
    category: "address",
    description: "必要に応じて役所での住所変更手続きを進めます。",
    done: false,
  },
  {
    id: 7,
    title: "当日の搬出・搬入導線を確認する",
    category: "movingday",
    description: "駐車位置、搬出経路、エレベーター利用などを確認します。",
    done: false,
  },
  {
    id: 8,
    title: "貴重品・壊れやすいものを分ける",
    category: "movingday",
    description: "当日自分で持つものと、業者に任せるものを整理します。",
    done: false,
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const completedCount = useMemo(() => tasks.filter((task) => task.done).length, [tasks]);
  const progress = Math.round((completedCount / tasks.length) * 100);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const groupedTasks = useMemo(() => {
    return {
      before: tasks.filter((task) => task.category === "before"),
      lifeline: tasks.filter((task) => task.category === "lifeline"),
      address: tasks.filter((task) => task.category === "address"),
      movingday: tasks.filter((task) => task.category === "movingday"),
    };
  }, [tasks]);

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1120px] px-4 py-6 md:px-6 md:py-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-navy">
            Movis
          </Link>
          <span className="text-sm text-muted">引越しタスク管理</span>
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
                    引越し準備を、Movisで整理する
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-muted md:text-base">
                    見積もり比較やチャット確認のあとも、引越しにはやることがたくさんあります。
                    Movisでは、必要な準備をタスク化して抜け漏れを防ぎます。
                  </p>
                </div>

                <div className="rounded-2xl border border-cyan/30 bg-cyan/10 p-5">
                  <div className="text-sm font-semibold text-navy">進捗状況</div>
                  <div className="mt-3">
                    <div className="h-3 w-full rounded-full bg-white/80">
                      <div
                        className="h-3 rounded-full bg-cyan transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="mt-2 text-sm font-medium text-navy">
                      {completedCount} / {tasks.length} 完了（{progress}%）
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-bg p-5">
                  <div className="text-sm font-semibold text-navy">Movisで管理できること</div>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    <li>・引越し前の準備整理</li>
                    <li>・ライフライン手続きの確認</li>
                    <li>・住所変更の抜け漏れ防止</li>
                    <li>・当日の持ち物や搬出準備の確認</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-white p-5">
                  <div className="text-sm font-semibold text-navy">Movisの次の拡張</div>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    <li>・ライフライン申込との連携</li>
                    <li>・住所変更対象の自動リマインド</li>
                    <li>・引越会社との当日連絡導線</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-bg p-4 md:p-5">
                <div className="rounded-xl border border-border bg-white px-4 py-3">
                  <div className="text-lg font-bold text-navy">引越しチェックリスト</div>
                  <div className="mt-1 text-sm text-muted">
                    優先度の高い項目から順に確認できます
                  </div>
                </div>

                <div className="mt-5 space-y-5">
                  <TaskSection
                    title="引越し前にやること"
                    items={groupedTasks.before}
                    onToggle={toggleTask}
                  />
                  <TaskSection
                    title="ライフライン"
                    items={groupedTasks.lifeline}
                    onToggle={toggleTask}
                  />
                  <TaskSection
                    title="住所変更"
                    items={groupedTasks.address}
                    onToggle={toggleTask}
                  />
                  <TaskSection
                    title="引越し当日"
                    items={groupedTasks.movingday}
                    onToggle={toggleTask}
                  />
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/confirm"
                    className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-navy hover:bg-white/80"
                  >
                    契約確認に戻る
                  </Link>

                  <button
                    className="inline-flex h-12 items-center justify-center rounded-lg bg-cyan px-5 text-sm font-semibold text-white transition hover:bg-[#0891B2]"
                    onClick={() => alert("今後はここからライフライン申込や通知機能につなげる想定です。")}
                  >
                    このまま準備を進める
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function TaskSection({
  title,
  items,
  onToggle,
}: {
  title: string;
  items: Task[];
  onToggle: (id: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4">
      <div className="text-sm font-semibold text-navy">{title}</div>
      <div className="mt-4 space-y-3">
        {items.map((task) => (
          <label
            key={task.id}
            className="flex items-start gap-3 rounded-xl border border-border bg-bg px-4 py-3 cursor-pointer"
          >
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 accent-[#06B6D4]"
              checked={task.done}
              onChange={() => onToggle(task.id)}
            />
            <div>
              <div
                className={[
                  "text-sm font-semibold",
                  task.done ? "text-muted line-through" : "text-navy"
                ].join(" ")}
              >
                {task.title}
              </div>
              <div className="mt-1 text-xs leading-5 text-muted">
                {task.description}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
