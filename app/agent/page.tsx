"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Lead = {
  id: string;
  customerName: string;
  propertyName: string;
  moveDate: string;
  status: "案内済み" | "動画登録済み" | "見積比較中" | "成約";
};

const mockLeads: Lead[] = [
  {
    id: "AG-001",
    customerName: "山田様",
    propertyName: "レジデンス横浜",
    moveDate: "2026/03/22",
    status: "案内済み",
  },
  {
    id: "AG-002",
    customerName: "佐藤様",
    propertyName: "グラン新宿",
    moveDate: "2026/03/24",
    status: "動画登録済み",
  },
  {
    id: "AG-003",
    customerName: "鈴木様",
    propertyName: "パーク世田谷",
    moveDate: "2026/03/28",
    status: "見積比較中",
  },
  {
    id: "AG-004",
    customerName: "高橋様",
    propertyName: "シティ川崎",
    moveDate: "2026/03/30",
    status: "成約",
  },
];

export default function AgentPage() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(mockLeads[0] ?? null);
  const [copied, setCopied] = useState(false);

  const totalLeads = mockLeads.length;
  const completed = mockLeads.filter((lead) => lead.status === "成約").length;
  const inProgress = mockLeads.filter((lead) => lead.status !== "成約").length;

  const inviteUrl = useMemo(() => {
    if (!selectedLead) return "https://lifeport-mvp-c9hc.vercel.app/signup";
    return `https://lifeport-mvp-c9hc.vercel.app/signup?lead=${selectedLead.id}`;
  }, [selectedLead]);

  const smsText = useMemo(() => {
    if (!selectedLead) return "";
    return `【Movis】引越し見積もりのご案内です。動画1本で複数社の見積もりを比較できます。こちらからご利用ください。 ${inviteUrl}`;
  }, [selectedLead, inviteUrl]);

  const handleCopy = async (text: string, mode: "url" | "sms") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
      if (mode === "url") {
        alert("案内リンクをコピーしました。");
      } else {
        alert("SMS文面をコピーしました。");
      }
    } catch {
      alert("コピーに失敗しました。");
    }
  };

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1280px] px-4 py-6 md:px-6 md:py-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-navy">
            Movis
          </Link>
          <span className="text-sm text-muted">不動産会社ダッシュボード</span>
        </header>

        <section className="mt-8">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-soft md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-navy">
                  Agent Dashboard
                </div>
                <h1 className="mt-4 text-2xl font-bold text-navy md:text-3xl">
                  Movis送客状況と案内導線を管理
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted md:text-base">
                  不動産会社は、入居者へのMovis案内状況や進捗、成約状況を確認できます。
                  案内リンクやSMS文面を活用して、入居者をスムーズにMovisへ送客できます。
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <SummaryCard label="送客件数" value={`${totalLeads}件`} />
                <SummaryCard label="進行中" value={`${inProgress}件`} />
                <SummaryCard label="成約" value={`${completed}件`} />
              </div>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1.35fr]">
              <div className="space-y-6">
                <div className="rounded-2xl border border-border bg-bg p-5">
                  <div className="text-sm font-semibold text-navy">Movis活用メリット</div>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
                    <li>・入居者の引越し手配負担を軽減</li>
                    <li>・不動産会社からの案内価値を向上</li>
                    <li>・付帯収益化や満足度向上につなげやすい</li>
                    <li>・ライフライン導線との接続も可能</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-cyan/30 bg-cyan/10 p-5">
                  <div className="text-sm font-semibold text-navy">案内導線イメージ</div>
                  <div className="mt-4 grid gap-3">
                    <FlowCard
                      title="賃貸契約"
                      text="契約時または入居前案内時にMovisを紹介"
                    />
                    <FlowCard
                      title="案内リンク送付"
                      text="SMSやメールでMovis案内URLを送付"
                    />
                    <FlowCard
                      title="動画査定・見積比較"
                      text="入居者が動画登録し、複数社比較へ進む"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-white p-5">
                  <div className="text-sm font-semibold text-navy">想定収益イメージ</div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <MetricCard title="月間送客" value="50件" />
                    <MetricCard title="成約率" value="20%" />
                    <MetricCard title="月間成約" value="10件" />
                    <MetricCard title="粗利想定" value="5〜10万円" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-border bg-bg p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-navy">送客案件一覧</div>
                      <div className="mt-1 text-sm text-muted">
                        不動産会社から案内した案件の進捗を確認できます
                      </div>
                    </div>

                    <Link
                      href="/signup"
                      className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-white px-4 text-sm font-semibold text-navy hover:bg-white/80"
                    >
                      ユーザー画面確認
                    </Link>
                  </div>

                  <div className="mt-5 space-y-3">
                    {mockLeads.map((lead) => (
                      <button
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className={[
                          "w-full rounded-2xl border p-4 text-left transition",
                          selectedLead?.id === lead.id
                            ? "border-cyan bg-cyan/10"
                            : "border-border bg-white hover:bg-bg",
                        ].join(" ")}
                      >
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="text-sm font-bold text-navy">
                              {lead.customerName} / {lead.propertyName}
                            </div>
                            <div className="mt-1 text-xs text-muted">
                              案件ID：{lead.id} / 引越予定日：{lead.moveDate}
                            </div>
                          </div>

                          <AgentStatusBadge status={lead.status} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedLead && (
                  <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                    <div className="text-lg font-bold text-navy">案内リンク発行</div>
                    <div className="mt-2 text-sm text-muted">
                      {selectedLead.customerName} / {selectedLead.propertyName} 向けの案内導線
                    </div>

                    <div className="mt-5 rounded-xl border border-border bg-bg p-4">
                      <div className="text-xs font-semibold text-muted">案内URL</div>
                      <div className="mt-2 break-all text-sm font-medium text-navy">
                        {inviteUrl}
                      </div>

                      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <button
                          className="inline-flex h-11 items-center justify-center rounded-lg bg-cyan px-4 text-sm font-semibold text-white hover:bg-[#0891B2]"
                          onClick={() => handleCopy(inviteUrl, "url")}
                        >
                          URLをコピー
                        </button>

                        <a
                          href={inviteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-white px-4 text-sm font-semibold text-navy hover:bg-white/80"
                        >
                          新しいタブで開く
                        </a>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-border bg-bg p-4">
                      <div className="text-xs font-semibold text-muted">SMS送信用文面</div>
                      <div className="mt-2 whitespace-pre-wrap text-sm leading-6 text-navy">
                        {smsText}
                      </div>

                      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <button
                          className="inline-flex h-11 items-center justify-center rounded-lg bg-cyan px-4 text-sm font-semibold text-white hover:bg-[#0891B2]"
                          onClick={() => handleCopy(smsText, "sms")}
                        >
                          文面をコピー
                        </button>

                        <button
                          className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-white px-4 text-sm font-semibold text-navy hover:bg-white/80"
                          onClick={() => alert("実運用ではここからSMS送信やメール送信に接続する想定です。")}
                        >
                          送信する（デモ）
                        </button>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-cyan/30 bg-cyan/10 p-4">
                      <div className="text-sm font-semibold text-navy">店舗案内時の使い方</div>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                        <li>・契約完了後にURLをSMSまたはメールで送付</li>
                        <li>・対面案内時はQRコード案内に置き換え可能</li>
                        <li>・ライフライン申込導線と同タイミングで案内可能</li>
                      </ul>
                    </div>

                    {copied && (
                      <div className="mt-4 text-sm font-medium text-cyan">
                        コピーしました。
                      </div>
                    )}
                  </div>
                )}

                <div className="rounded-2xl border border-border bg-white p-5">
                  <div className="text-sm font-semibold text-navy">今後の拡張イメージ</div>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    <li>・QRコード自動生成</li>
                    <li>・店舗別、担当者別の送客実績管理</li>
                    <li>・ライフライン申込率や付帯収益の可視化</li>
                    <li>・進捗に応じた自動リマインド送信</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/"
                    className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-navy hover:bg-white/80"
                  >
                    トップへ戻る
                  </Link>

                  <Link
                    href="/quotes"
                    className="inline-flex h-12 items-center justify-center rounded-lg bg-cyan px-5 text-sm font-semibold text-white transition hover:bg-[#0891B2]"
                  >
                    ユーザー画面を見る
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

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-bg px-4 py-4">
      <div className="text-xs text-muted">{label}</div>
      <div className="mt-1 text-2xl font-bold text-navy">{value}</div>
    </div>
  );
}

function FlowCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-white/60 bg-white p-4">
      <div className="text-sm font-semibold text-navy">{title}</div>
      <div className="mt-2 text-xs leading-5 text-muted">{text}</div>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-bg p-4">
      <div className="text-xs text-muted">{title}</div>
      <div className="mt-1 text-sm font-semibold text-navy">{value}</div>
    </div>
  );
}

function AgentStatusBadge({
  status,
}: {
  status: "案内済み" | "動画登録済み" | "見積比較中" | "成約";
}) {
  if (status === "成約") {
    return (
      <span className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-navy">
        成約
      </span>
    );
  }

  if (status === "見積比較中") {
    return (
      <span className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
        見積比較中
      </span>
    );
  }

  if (status === "動画登録済み") {
    return (
      <span className="inline-flex rounded-full border border-green-300 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
        動画登録済み
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-muted">
      案内済み
    </span>
  );
}
