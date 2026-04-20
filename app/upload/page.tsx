"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { saveVideo } from "../../lib/videoStore";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const canSubmit = useMemo(() => !!file && !isSaving, [file, isSaving]);

  const handleSubmit = async () => {
    if (!file) return;

    try {
      setIsSaving(true);

      const saved = await saveVideo(file);

      localStorage.setItem("movis_latest_video_meta", JSON.stringify(saved));

      alert("動画を受け付けました（デモ）");
      window.location.href = "/progress";
    } catch (error) {
      console.error(error);
      alert("動画の保存に失敗しました。");
    } finally {
      setIsSaving(false);
    }
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
                  STEP 4
                </div>

                <h1 className="mt-4 text-2xl font-bold text-navy md:text-3xl">
                  撮影した動画をアップロード
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted md:text-base">
                  撮影した動画をアップロードすると、引越会社が実際の室内状況を確認し、
                  各社判断で見積作成ができるようになります。
                </p>

                <div className="mt-6 rounded-2xl border border-cyan/30 bg-cyan/10 p-5">
                  <div className="text-sm font-semibold text-navy">アップロード後の流れ</div>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <FlowBox step="1" title="動画保存" text="撮影した動画をMovisが保存" />
                    <FlowBox step="2" title="会社確認" text="引越会社が動画を見て見積作成" />
                    <FlowBox step="3" title="比較" text="ユーザーが見積を比較して決定" />
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-bg p-5">
                  <div className="text-sm font-semibold text-navy">デモ時の仕様</div>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    <li>・アップロードした動画はこのブラウザ内に保存されます</li>
                    <li>・引越会社画面から動画確認ができます</li>
                    <li>・本番化する場合はクラウド保存へ切替可能です</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-bg p-5 md:p-6">
                <div className="text-lg font-bold text-navy">動画ファイルを選択</div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  スマホで撮影した動画をアップロードしてください。
                </p>

                <div className="mt-6 rounded-2xl border border-dashed border-cyan/40 bg-white p-6 text-center">
                  <div className="text-sm font-semibold text-navy">動画ファイルを選択</div>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    推奨：30秒〜2分程度 / mp4, mov など
                  </p>

                  <div className="mt-5">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      className="block w-full text-sm text-muted"
                    />
                  </div>

                  {file && (
                    <div className="mt-4 rounded-xl border border-cyan/30 bg-cyan/10 p-3 text-left">
                      <div className="text-sm font-medium text-navy">選択中ファイル</div>
                      <div className="mt-2 text-xs leading-5 text-muted">
                        ファイル名：{file.name}
                        <br />
                        サイズ：{Math.round(file.size / 1024 / 1024 * 100) / 100} MB
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-5 rounded-xl border border-border bg-white p-4">
                  <div className="text-xs font-semibold text-muted">次のステップ</div>
                  <div className="mt-1 text-sm font-medium text-navy">
                    見積進捗画面で、各社の見積対応状況を確認できます
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/video"
                    className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-navy hover:bg-white/80"
                  >
                    戻る
                  </Link>

                  <button
                    onClick={handleSubmit}
                    className={[
                      "inline-flex h-12 items-center justify-center rounded-lg px-5 text-sm font-semibold transition",
                      canSubmit
                        ? "bg-cyan text-white hover:bg-[#0891B2]"
                        : "pointer-events-none bg-border text-muted",
                    ].join(" ")}
                  >
                    {isSaving ? "保存中..." : "アップロードして進む"}
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
