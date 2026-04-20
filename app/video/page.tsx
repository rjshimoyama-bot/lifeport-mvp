"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { saveVideo } from "../../lib/videoStore";

const steps = [
  {
    id: 1,
    title: "玄関",
    description: "玄関全体と、廊下の幅がわかるようにゆっくり撮影してください。",
    tags: ["靴箱", "廊下幅", "大型荷物", "玄関収納"],
    checks: [
      "玄関全体が映っている",
      "廊下や通路の幅がわかる",
      "大きな荷物があれば映している",
    ],
  },
  {
    id: 2,
    title: "リビング",
    description: "家具の配置と全体の広さがわかるように、部屋を一周するように撮影してください。",
    tags: ["ソファ", "テレビ台", "テーブル", "収納"],
    checks: [
      "部屋の全体感がわかる",
      "大型家具が映っている",
      "床に置いてある荷物も確認できる",
    ],
  },
  {
    id: 3,
    title: "寝室",
    description: "ベッド、タンス、衣装ケースなどを中心に撮影してください。",
    tags: ["ベッド", "タンス", "衣装ケース", "寝具"],
    checks: [
      "ベッドサイズがわかる",
      "収納家具が映っている",
      "追加荷物があれば映っている",
    ],
  },
  {
    id: 4,
    title: "キッチン",
    description: "冷蔵庫、食器棚、電子レンジ台などを撮影してください。",
    tags: ["冷蔵庫", "食器棚", "家電", "ラック"],
    checks: [
      "冷蔵庫が映っている",
      "棚やラックが映っている",
      "キッチン家電が把握できる",
    ],
  },
  {
    id: 5,
    title: "洗面・浴室まわり",
    description: "洗濯機やラックなど、搬出が必要なものを撮影してください。",
    tags: ["洗濯機", "棚", "収納", "脱衣所"],
    checks: [
      "洗濯機が映っている",
      "周辺収納が映っている",
      "狭さ・動線が確認できる",
    ],
  },
  {
    id: 6,
    title: "最後に全体確認",
    description: "撮り漏れがないか確認し、最後に部屋全体を簡単に見直してください。",
    tags: ["撮り漏れ防止", "全体確認", "最終チェック"],
    checks: [
      "主要な部屋をすべて撮影した",
      "大型家具を撮影した",
      "通路や搬出条件も確認できる",
    ],
  },
];

export default function VideoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const current = steps[currentStep];
  const progress = Math.round(((currentStep + 1) / steps.length) * 100);

  const canMoveNext = useMemo(() => checkedItems.length > 0, [checkedItems.length]);

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
    );
  };

  const goNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setCheckedItems([]);
    }
  };

  const goPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setCheckedItems([]);
    }
  };

  const openCamera = () => {
    fileInputRef.current?.click();
  };

  const handleVideoSelected = async (file: File | null) => {
    if (!file) return;

    try {
      setIsSaving(true);

      const saved = await saveVideo(file);
      localStorage.setItem("movis_latest_video_meta", JSON.stringify(saved));

      alert("動画を保存しました。見積進捗画面へ進みます。");
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
          <span className="text-sm text-muted">動画撮影ガイド</span>
        </header>

        <section className="mt-8">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-soft md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-navy md:text-3xl">
                      3〜5分で完了する、Movis動画査定
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-muted md:text-base">
                      ガイドに沿って部屋を撮影するだけで、引越し見積もりに必要な情報をまとめて伝えられます。
                      訪問見積もりの代わりに、Movis上で各社が動画を確認します。
                    </p>
                  </div>

                  <div className="rounded-2xl border border-cyan/30 bg-cyan/10 px-5 py-4 text-center">
                    <div className="text-xs text-muted">撮影ステップ</div>
                    <div className="mt-1 text-2xl font-bold text-navy">
                      {currentStep + 1} / {steps.length}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-cyan transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-muted">進行状況 {progress}%</div>
                </div>

                <div className="mt-8 rounded-2xl border border-border bg-bg p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-sm font-bold text-navy">
                      {current.id}
                    </div>

                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-navy">{current.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {current.description}
                      </p>

                      <div className="mt-6 rounded-2xl border border-border bg-white p-4">
                        <div className="text-sm font-semibold text-navy">
                          Movisが確認したいポイント
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {current.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-navy"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 rounded-2xl border border-border bg-white p-4">
                        <div className="text-sm font-semibold text-navy">撮影チェック</div>
                        <div className="mt-3 space-y-3">
                          {current.checks.map((item) => (
                            <label key={item} className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                className="h-5 w-5 accent-[#06B6D4]"
                                checked={checkedItems.includes(item)}
                                onChange={() => toggleCheck(item)}
                              />
                              <span className="text-sm text-navy">{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <button
                          onClick={openCamera}
                          disabled={isSaving}
                          className={[
                            "inline-flex h-12 items-center justify-center rounded-lg px-5 text-sm font-semibold transition",
                            isSaving
                              ? "pointer-events-none bg-border text-muted"
                              : "bg-cyan text-white hover:bg-[#0891B2]",
                          ].join(" ")}
                        >
                          {isSaving ? "保存中..." : "撮影して保存する"}
                        </button>

                        <button
                          onClick={goNextStep}
                          disabled={!canMoveNext || currentStep === steps.length - 1}
                          className={[
                            "inline-flex h-12 items-center justify-center rounded-lg px-5 text-sm font-semibold transition",
                            canMoveNext && currentStep !== steps.length - 1
                              ? "border border-border bg-white text-navy hover:bg-bg"
                              : "pointer-events-none border border-border bg-white text-muted",
                          ].join(" ")}
                        >
                          次の撮影ステップへ
                        </button>

                        <button
                          onClick={goPrevStep}
                          disabled={currentStep === 0}
                          className={[
                            "inline-flex h-12 items-center justify-center rounded-lg px-5 text-sm font-semibold transition",
                            currentStep > 0
                              ? "border border-border bg-white text-navy hover:bg-bg"
                              : "pointer-events-none border border-border bg-white text-muted",
                          ].join(" ")}
                        >
                          戻る
                        </button>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        capture="environment"
                        className="hidden"
                        onChange={(e) => handleVideoSelected(e.target.files?.[0] ?? null)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-cyan/30 bg-cyan/10 p-5">
                  <div className="text-lg font-bold text-navy">撮影の目安</div>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
                    <li>・全体で約3〜5分</li>
                    <li>・1部屋あたり30秒前後</li>
                    <li>・家具がすべて見えるようにゆっくり撮影</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-bg p-5">
                  <div className="text-lg font-bold text-navy">撮影のコツ</div>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
                    <li>・部屋を一周するように撮る</li>
                    <li>・大型家具は近づいて撮る</li>
                    <li>・通路や玄関も忘れずに映す</li>
                    <li>・逆光や暗さに注意する</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-white p-5">
                  <div className="text-lg font-bold text-navy">補足</div>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    スマホでは「撮影して保存する」を押すとカメラまたは動画選択画面が開きます。
                    保存後はそのまま見積進捗画面に進みます。
                  </p>

                  <div className="mt-5">
                    <Link
                      href="/upload"
                      className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-bg px-4 text-sm font-semibold text-navy hover:bg-white"
                    >
                      既存の動画をアップロードする
                    </Link>
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
