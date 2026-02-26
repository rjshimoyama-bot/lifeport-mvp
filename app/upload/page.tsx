"use client";

import Link from "next/link";
import { useState } from "react";

export default function UploadPage() {
  const [fileName, setFileName] = useState("");

  const submit = () => {
    if (!fileName) return;
    localStorage.setItem("lp_video_filename", fileName);
    localStorage.setItem("lp_submitted_at", new Date().toISOString());
    alert("動画を受け付けました（デモ）");
  };

  return (
    <div className="mx-auto max-w-[960px] px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-navy font-semibold text-lg">LifePort</Link>
        <span className="text-sm text-muted">アップロード</span>
      </div>

      <div className="rounded-xl border border-border bg-white p-6 shadow-soft">
        <h1 className="text-navy text-xl font-semibold">動画アップロード（デモ）</h1>
        <p className="mt-2 text-sm text-muted">
          MVPではローカル選択＋擬似アップロードです。実運用ではストレージ保存・期限削除を実装します。
        </p>

        <div className="mt-6">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            className="block w-full text-sm"
          />
        </div>

        <div className="mt-4 rounded-xl border border-cyan/30 bg-cyan/10 p-4 text-sm text-navy">
          電話番号は成約後まで公開しません。動画は一定期間後に自動削除方針（MVPは表示のみ）。
        </div>

        <div className="mt-6 flex gap-3">
          <Link className="inline-flex h-12 items-center justify-center rounded-lg px-4 text-sm font-medium text-navy hover:bg-bg" href="/video">
            戻る
          </Link>
          <Link
            className={[
              "inline-flex h-12 items-center justify-center rounded-lg px-4 text-sm font-medium",
              fileName ? "bg-cyan text-white hover:bg-[#0891B2]" : "bg-border text-muted pointer-events-none"
            ].join(" ")}
            href="/progress"
            onClick={submit as any}
            title={!fileName ? "ファイルを選択してください" : ""}
          >
            送信して進捗へ
          </Link>
        </div>
      </div>
    </div>
  );
}