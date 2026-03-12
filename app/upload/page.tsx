"use client";

import Link from "next/link";
import { useState } from "react";

export default function UploadPage() {
  const [fileName, setFileName] = useState("");

  const handleSubmit = () => {
    if (!fileName) return;
    localStorage.setItem("lp_video_filename", fileName);
    localStorage.setItem("lp_submitted_at", new Date().toISOString());
    alert("動画を受け付けました（デモ）");
  };

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1120px] px-4 py-6 md:px-6 md:py-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-navy">
            Movis
          </Link>
          <span className="text-sm text-muted">動画アップロード</span>
        </header>

        <section className="mt-8">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-soft md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.8fr]">
              <div>
                <div className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-navy">
                  STEP 3
                </div>

                <h1 className="mt-4 text-2xl font-bold text-navy md:text-3xl">
                  撮影した動画をアップロード
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted md:text-base">
                  撮影した動画をアップロードすると、Movis AIが内容を整理し、
                  引越会社が見積もりを作成しやすい形にまとめます。
                </p>

                <div className="mt-6 rounded-2xl border border-cyan/30 bg-cyan/10 p-5">
                  <div className="text-sm font-semibold text-navy">アップロード後の流れ</div>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <FlowBox step="1" title="動画受信" text="撮影した動画をMovisが受け付けます" />
                    <FlowBox step="2" title="AI整理" text="物量や条件を整理し、見積しやすい形にします" />
                    <FlowBox step="3" title="見積比較" text="複数社から価格と条件が届きます" />
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-bg p-5">
                  <div className="text-sm font-semibold text-navy">Movisの安心設計</div>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    <li>・動画は見積もり目的でのみ利用されます</li>
                    <li>・一定期間経過後に自動削除する運用を想定しています</li>
                    <li>・電話番号は契約成立まで引越会社に公開されません</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-bg p-5 md:p-6">
                <div className="text-lg font-bold text-navy">動画ファイルを選択</div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  スマホで撮影した動画をアップロードしてください。
                </p>

                <div className="mt-6 rounded-2xl border border-dashed border-cyan/40 bg-white p-6 text-center">
                  <div className="text-sm font-semibold text-navy">
                    動画ファイルを選択
                  </div>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    推奨：30秒〜2分程度 / 家具や収納がわかる内容
                  </p>

                  <div className="mt-5">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                      className="block w-full text-sm text-muted"
                    />
                  </div>

                  {fileName && (
                    <div className="mt-4 rounded-xl border border-cyan/30 bg-cyan/10 p-3 text-sm font-medium text-navy">
                      選択中：{fileName}
                    </div>
                  )}
                </div>

                <div className="mt-5 rounded-xl border border-border bg-white p-4">
                  <div className="text-xs font-semibold text-muted">アップロード後</div>
                  <div className="mt-1 text-sm font-medium text-navy">
                    見積進捗画面で、各社の対応状況を確認できます
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/video"
                    className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-navy hover:bg-white/80"
                  >
                    戻る
                  </Link>

                  <Link
                    href="/progress"
                    onClick={handleSubmit}
                    className={[
                      "inline-flex h-12 items-center justify-center rounded-lg px-5 text-sm font-semibold transition",
                      fileName
                        ? "bg-cyan text-white hover:bg-[#0891B2]"
                        : "pointer-events-none bg-border text-muted"
                    ].join(" ")}
                  >
                    アップロードして進む
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

function FlowBox({
  step,
  title,
  text,
}: {
  step: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/60 bg-white p-4">
      <div className="text-xs font-semibold text-cyan">STEP {step}</div>
      <div className="mt-1 text-sm font-semibold text-navy">{title}</div>
      <div className="mt-2 text-xs leading-5 text-muted">{text}</div>
    </div>
  );
}
