"use client";

import { useState } from "react";
import Link from "next/link";

type Request = {
  id: string;
  area: string;
  size: string;
  date: string;
  video: string;
};

const mockRequests: Request[] = [
  {
    id: "REQ001",
    area: "東京都 → 神奈川県",
    size: "1LDK",
    date: "3/22",
    video: "動画あり",
  },
  {
    id: "REQ002",
    area: "横浜市 → 川崎市",
    size: "2DK",
    date: "3/23",
    video: "動画あり",
  },
];

export default function CarrierPage() {
  const [selected, setSelected] = useState<Request | null>(null);
  const [price, setPrice] = useState("");
  const [efficiency, setEfficiency] = useState("普通");

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1100px] px-4 py-8">

        <header className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-navy">
            Movis
          </Link>
          <span className="text-sm text-muted">
            引越会社ダッシュボード
          </span>
        </header>

        <section className="mt-8">

          <h1 className="text-2xl font-bold text-navy">
            見積依頼一覧
          </h1>

          <div className="mt-6 grid gap-4">

            {mockRequests.map((req) => (
              <div
                key={req.id}
                className="rounded-xl border border-border bg-white p-5 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-navy">
                    {req.area}
                  </div>

                  <div className="text-sm text-muted mt-1">
                    {req.size} / {req.date}
                  </div>
                </div>

                <button
                  className="rounded-lg bg-cyan px-4 py-2 text-white"
                  onClick={() => setSelected(req)}
                >
                  見積作成
                </button>
              </div>
            ))}

          </div>

          {selected && (
            <div className="mt-10 rounded-2xl border border-border bg-white p-6">

              <h2 className="text-xl font-bold text-navy">
                見積提出
              </h2>

              <div className="mt-4 text-sm text-muted">
                案件
              </div>

              <div className="font-semibold text-navy">
                {selected.area}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">

                <div>
                  <div className="text-sm text-muted">
                    見積金額
                  </div>

                  <input
                    className="mt-1 w-full rounded-lg border border-border p-3"
                    placeholder="例：72000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div>
                  <div className="text-sm text-muted">
                    ルート効率
                  </div>

                  <select
                    className="mt-1 w-full rounded-lg border border-border p-3"
                    value={efficiency}
                    onChange={(e) => setEfficiency(e.target.value)}
                  >
                    <option>良い</option>
                    <option>普通</option>
                    <option>悪い</option>
                  </select>
                </div>

              </div>

              <div className="mt-6 flex gap-3">

                <button
                  className="rounded-lg border border-border px-5 py-2"
                  onClick={() => setSelected(null)}
                >
                  キャンセル
                </button>

                <button
                  className="rounded-lg bg-navy text-white px-5 py-2"
                  onClick={() => {
                    alert("見積提出しました（デモ）");
                    setSelected(null);
                    setPrice("");
                  }}
                >
                  見積提出
                </button>

              </div>

            </div>
          )}

        </section>
      </div>
    </main>
  );
}
