"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SelectedQuote = {
  company: string;
  plan: string;
  price: string;
  crew: string;
  truck: string;
  insurance: string;
  note: string;
};

type UserInfo = {
  name: string;
  email: string;
  phone: string;
};

type LeadInfo = {
  leadId: string;
  agentName: string;
  propertyName: string;
};

export default function HandoffPage() {
  const [selectedQuote, setSelectedQuote] = useState<SelectedQuote>({
    company: "未選択",
    plan: "-",
    price: "-",
    crew: "-",
    truck: "-",
    insurance: "-",
    note: "見積もり内容を確認してください。",
  });

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    phone: "",
  });

  const [leadInfo, setLeadInfo] = useState<LeadInfo | null>(null);
  const [agreePhoneShare, setAgreePhoneShare] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    const savedQuote = localStorage.getItem("movis_selected_quote");
    if (savedQuote) {
      try {
        setSelectedQuote(JSON.parse(savedQuote));
      } catch {
        // noop
      }
    }

    const savedUser = localStorage.getItem("movis_user_info");
    if (savedUser) {
      try {
        setUserInfo(JSON.parse(savedUser));
      } catch {
        // noop
      }
    }

    const savedLead = localStorage.getItem("movis_lead_info");
    if (savedLead) {
      try {
        setLeadInfo(JSON.parse(savedLead));
      } catch {
        // noop
      }
    }
  }, []);

  const canSubmit =
    userInfo.name.trim() &&
    userInfo.phone.trim() &&
    selectedQuote.company !== "未選択" &&
    agreePhoneShare &&
    agreeTerms;

  const handleSubmit = () => {
    if (!canSubmit) return;

    const existing = JSON.parse(localStorage.getItem("movis_confirmed_orders") || "[]");

    const order = {
      id: `ORD-${Date.now()}`,
      company: selectedQuote.company,
      plan: selectedQuote.plan,
      price: selectedQuote.price,
      crew: selectedQuote.crew,
      truck: selectedQuote.truck,
      insurance: selectedQuote.insurance,
      customerName: userInfo.name,
      customerEmail: userInfo.email,
      customerPhone: userInfo.phone,
      leadId: leadInfo?.leadId || "",
      agentName: leadInfo?.agentName || "",
      propertyName: leadInfo?.propertyName || "",
      handoffAt: new Date().toISOString(),
      status: "連携済み",
    };

    localStorage.setItem(
      "movis_confirmed_orders",
      JSON.stringify([order, ...existing])
    );

    alert("電話番号連携を含む発注情報を引越会社へ連携しました（デモ）。");
    window.location.href = "/tasks";
  };

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1120px] px-4 py-6 md:px-6 md:py-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-navy">
            Movis
          </Link>
          <span className="text-sm text-muted">発注情報連携</span>
        </header>

        <section className="mt-8">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-soft md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-4">
                <div className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-navy">
                  STEP 7
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-navy md:text-3xl">
                    発注確定と電話番号連携
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-muted md:text-base">
                    発注先が決定したため、引越会社との正式な連絡に必要な電話番号を連携します。
                    ここで確定すると、引越会社側画面にも発注情報が反映されます。
                  </p>
                </div>

                <div className="rounded-2xl border border-cyan/30 bg-cyan/10 p-5">
                  <div className="text-sm font-semibold text-navy">連携される情報</div>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    <li>・お名前</li>
                    <li>・電話番号</li>
                    <li>・選択した見積内容</li>
                    <li>・必要に応じて案内元案件情報</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-bg p-5">
                  <div className="text-sm font-semibold text-navy">連携先の発注内容</div>
                  <div className="mt-4 space-y-3">
                    <InfoRow label="引越会社" value={selectedQuote.company} />
                    <InfoRow label="日程" value={selectedQuote.plan} />
                    <InfoRow label="料金" value={selectedQuote.price} />
                    <InfoRow label="作業員" value={selectedQuote.crew} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-bg p-5">
                <div className="rounded-xl border border-border bg-white px-4 py-3">
                  <div className="text-lg font-bold text-navy">電話番号連携の確認</div>
                  <div className="mt-1 text-sm text-muted">
                    引越会社へ共有する内容を確認してください
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <ReadOnlyField label="お名前" value={userInfo.name || "-"} />
                  <ReadOnlyField label="メールアドレス" value={userInfo.email || "-"} />
                  <ReadOnlyField label="電話番号" value={userInfo.phone || "-"} />
                  <ReadOnlyField label="引越会社" value={selectedQuote.company || "-"} />
                  <ReadOnlyField label="見積プラン" value={selectedQuote.plan || "-"} />
                </div>

                {leadInfo && (
                  <div className="mt-5 rounded-xl border border-border bg-white p-4">
                    <div className="text-sm font-semibold text-navy">案内元案件情報</div>
                    <div className="mt-3 space-y-2">
                      <InfoRow label="案件ID" value={leadInfo.leadId} />
                      <InfoRow label="案内元" value={leadInfo.agentName} />
                      <InfoRow label="物件名" value={leadInfo.propertyName} />
                    </div>
                  </div>
                )}

                <div className="mt-5 rounded-xl border border-border bg-white p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 h-5 w-5 accent-[#06B6D4]"
                      checked={agreePhoneShare}
                      onChange={(e) => setAgreePhoneShare(e.target.checked)}
                    />
                    <span className="text-sm leading-6 text-navy">
                      発注確定のため、電話番号を引越会社へ連携することに同意します。
                    </span>
                  </label>

                  <label className="mt-4 flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 h-5 w-5 accent-[#06B6D4]"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                    />
                    <span className="text-sm leading-6 text-navy">
                      契約後は引越会社との直接連絡が発生することを理解し、発注を確定します。
                    </span>
                  </label>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/confirm"
                    className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-navy hover:bg-white/80"
                  >
                    契約確認に戻る
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
                    この内容で連携する
                  </button>
                </div>

                <div className="mt-4 text-xs leading-5 text-muted">
                  デモでは、この操作により引越会社側ダッシュボードへ発注情報が反映されます。
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4">
      <div className="text-xs font-semibold text-muted">{label}</div>
      <div className="mt-1 text-sm font-semibold text-navy">{value}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/60 bg-white px-4 py-3">
      <div className="text-xs font-semibold text-muted">{label}</div>
      <div className="text-sm font-semibold text-navy">{value}</div>
    </div>
  );
}
