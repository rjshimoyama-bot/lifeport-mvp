"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type RequestStatus = "new" | "reviewing" | "quoted";

type MoveRequest = {
  id: string;
  companyName: string;
  customerType: string;
  fromArea: string;
  toArea: string;
  layout: string;
  preferredDate: string;
  flexibility: string;
  timeband: string;
  buildingFrom: string;
  buildingTo: string;
  note: string;
  videoStatus: string;
  status: RequestStatus;
};

type QuoteForm = {
  dateOption1: string;
  price1: string;
  dateOption2: string;
  price2: string;
  dateOption3: string;
  price3: string;
  crew: string;
  truck: string;
  insurance: string;
  comment: string;
};

type ConfirmedOrder = {
  id: string;
  company: string;
  plan: string;
  price: string;
  crew: string;
  truck: string;
  insurance: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  leadId: string;
  agentName: string;
  propertyName: string;
  handoffAt: string;
  status: string;
};

const initialForm: QuoteForm = {
  dateOption1: "",
  price1: "",
  dateOption2: "",
  price2: "",
  dateOption3: "",
  price3: "",
  crew: "2名",
  truck: "2tクラス",
  insurance: "あり",
  comment: "",
};

const mockRequests: MoveRequest[] = [
  {
    id: "MV-24001",
    companyName: "サクラ引越センター",
    customerType: "2人暮らし",
    fromArea: "東京都世田谷区",
    toArea: "神奈川県横浜市",
    layout: "1LDK",
    preferredDate: "2026/03/22",
    flexibility: "前後3日OK",
    timeband: "終日可",
    buildingFrom: "3階 / EVなし",
    buildingTo: "2階 / EVあり",
    note: "洗濯機・冷蔵庫あり。段ボールは標準量を想定。",
    videoStatus: "動画あり",
    status: "new",
  },
  {
    id: "MV-24002",
    companyName: "ミライ運送",
    customerType: "単身",
    fromArea: "神奈川県川崎市",
    toArea: "東京都新宿区",
    layout: "1K",
    preferredDate: "2026/03/24",
    flexibility: "1日固定",
    timeband: "午前希望",
    buildingFrom: "5階 / EVあり",
    buildingTo: "4階 / EVあり",
    note: "大型家具少なめ。デスクとテレビ台あり。",
    videoStatus: "動画あり",
    status: "reviewing",
  },
  {
    id: "MV-24003",
    companyName: "スマートムーブ",
    customerType: "家族",
    fromArea: "東京都練馬区",
    toArea: "埼玉県さいたま市",
    layout: "3LDK",
    preferredDate: "2026/03/28",
    flexibility: "前後1週間OK",
    timeband: "午後希望",
    buildingFrom: "戸建て",
    buildingTo: "戸建て",
    note: "大型家具多め。ベッド複数・食器棚あり。",
    videoStatus: "動画あり",
    status: "quoted",
  },
];

export default function CarrierPage() {
  const [requests, setRequests] = useState<MoveRequest[]>(mockRequests);
  const [selectedId, setSelectedId] = useState<string | null>(mockRequests[0]?.id ?? null);
  const [form, setForm] = useState<QuoteForm>(initialForm);
  const [confirmedOrders, setConfirmedOrders] = useState<ConfirmedOrder[]>([]);

  const selectedRequest = useMemo(
    () => requests.find((req) => req.id === selectedId) ?? null,
    [requests, selectedId]
  );

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("movis_confirmed_orders") || "[]");
    setConfirmedOrders(saved);
  }, []);

  const updateForm = (key: keyof QuoteForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submitQuote = () => {
    if (!selectedRequest) return;

    if (!form.dateOption1 || !form.price1) {
      alert("少なくとも1つの日程と見積金額を入力してください。");
      return;
    }

    const toCrewNumber = (value: string) => {
      const parsed = Number(value.replace("名", ""));
      return Number.isNaN(parsed) ? 2 : parsed;
    };

    const submittedQuote = {
      companyId: selectedRequest.id,
      companyName: selectedRequest.companyName,
      companyNote: `${selectedRequest.companyName} から提出された見積です`,
      rating: 4.5,
      options: [
        form.dateOption1 && form.price1
          ? {
              id: `${selectedRequest.id}-1`,
              label: form.dateOption1,
              price: Number(form.price1),
              crew: toCrewNumber(form.crew),
              boxes: 20,
              insurance: form.insurance,
              hint: form.comment || "提出された見積です。",
            }
          : null,
        form.dateOption2 && form.price2
          ? {
              id: `${selectedRequest.id}-2`,
              label: form.dateOption2,
              price: Number(form.price2),
              crew: toCrewNumber(form.crew),
              boxes: 20,
              insurance: form.insurance,
              hint: form.comment || "提出された見積です。",
            }
          : null,
        form.dateOption3 && form.price3
          ? {
              id: `${selectedRequest.id}-3`,
              label: form.dateOption3,
              price: Number(form.price3),
              crew: toCrewNumber(form.crew),
              boxes: 20,
              insurance: form.insurance,
              hint: form.comment || "提出された見積です。",
            }
          : null,
      ].filter(Boolean),
      truck: form.truck,
      insurance: form.insurance,
    };

    const existing = JSON.parse(localStorage.getItem("movis_submitted_quotes") || "[]");
    const filtered = existing.filter((item: any) => item.companyId !== selectedRequest.id);

    localStorage.setItem(
      "movis_submitted_quotes",
      JSON.stringify([...filtered, submittedQuote])
    );

    alert("見積を提出しました（デモ）。");

    setRequests((prev) =>
      prev.map((req) =>
        req.id === selectedRequest.id ? { ...req, status: "quoted" } : req
      )
    );

    setForm(initialForm);
  };

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1280px] px-4 py-6 md:px-6 md:py-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-navy">
            Movis
          </Link>
          <span className="text-sm text-muted">引越会社ダッシュボード</span>
        </header>

        <section className="mt-8">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-soft md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-navy">
                  Mover Dashboard
                </div>
                <h1 className="mt-4 text-2xl font-bold text-navy md:text-3xl">
                  Movis案件一覧と見積提出
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted md:text-base">
                  ユーザーがアップロードした動画と条件を確認し、引越会社ごとに日程別の見積を提出します。
                  発注確定後は、電話番号を含む連携情報が下部に反映されます。
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-bg px-4 py-4">
                <div className="text-xs text-muted">対応中案件</div>
                <div className="mt-1 text-2xl font-bold text-navy">{requests.length}件</div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1.35fr]">
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-bg p-4">
                  <div className="text-sm font-semibold text-navy">案件一覧</div>
                  <div className="mt-4 space-y-3">
                    {requests.map((req) => (
                      <button
                        key={req.id}
                        onClick={() => setSelectedId(req.id)}
                        className={[
                          "w-full rounded-2xl border p-4 text-left transition",
                          selectedId === req.id
                            ? "border-cyan bg-cyan/10"
                            : "border-border bg-white hover:bg-bg",
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-bold text-navy">{req.companyName}</div>
                            <div className="mt-1 text-sm text-navy">
                              {req.fromArea} → {req.toArea}
                            </div>
                            <div className="mt-1 text-xs text-muted">
                              {req.customerType} / {req.layout} / {req.preferredDate}
                            </div>
                          </div>
                          <StatusBadge status={req.status} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                {!selectedRequest ? (
                  <div className="rounded-2xl border border-border bg-bg p-8 text-center text-muted">
                    案件を選択してください
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="rounded-2xl border border-border bg-bg p-5">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="text-sm font-semibold text-muted">案件詳細</div>
                          <div className="mt-1 text-xl font-bold text-navy">
                            {selectedRequest.companyName}
                          </div>
                          <div className="mt-1 text-sm text-muted">{selectedRequest.id}</div>
                        </div>
                        <StatusBadge status={selectedRequest.status} />
                      </div>

                      <div className="mt-5 grid gap-3 md:grid-cols-2">
                        <InfoCard title="世帯・間取り" value={`${selectedRequest.customerType} / ${selectedRequest.layout}`} />
                        <InfoCard title="希望日" value={selectedRequest.preferredDate} />
                        <InfoCard title="日程柔軟性" value={selectedRequest.flexibility} />
                        <InfoCard title="時間帯" value={selectedRequest.timeband} />
                        <InfoCard title="搬出元" value={selectedRequest.buildingFrom} />
                        <InfoCard title="搬入先" value={selectedRequest.buildingTo} />
                      </div>

                      <div className="mt-5 rounded-xl border border-border bg-white p-4">
                        <div className="text-xs text-muted">備考</div>
                        <div className="mt-2 text-sm leading-6 text-navy">
                          {selectedRequest.note}
                        </div>
                      </div>

                      <div className="mt-4 rounded-xl border border-cyan/30 bg-cyan/10 p-4">
                        <div className="text-sm font-semibold text-navy">動画情報</div>
                        <div className="mt-2 text-sm text-muted">
                          {selectedRequest.videoStatus}（デモでは動画プレビューは省略。実運用ではここで動画確認）
                        </div>
                        <button
                          className="mt-4 inline-flex h-11 items-center justify-center rounded-lg border border-navy bg-white px-4 text-sm font-semibold text-navy hover:bg-bg"
                          onClick={() => alert("動画プレビューは次フェーズで追加予定です。")}
                        >
                          動画を確認する
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                      <div className="text-lg font-bold text-navy">見積提出</div>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        日程別に最大3案まで提示できます。ルート効率や社内事情は各社判断で反映してください。
                      </p>

                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <Field label="候補日程 1" value={form.dateOption1} onChange={(v) => updateForm("dateOption1", v)} placeholder="例：3/22 終日" />
                        <Field label="見積金額 1" value={form.price1} onChange={(v) => updateForm("price1", v)} placeholder="例：72000" />
                        <Field label="候補日程 2" value={form.dateOption2} onChange={(v) => updateForm("dateOption2", v)} placeholder="例：3/23 午前" />
                        <Field label="見積金額 2" value={form.price2} onChange={(v) => updateForm("price2", v)} placeholder="例：76000" />
                        <Field label="候補日程 3" value={form.dateOption3} onChange={(v) => updateForm("dateOption3", v)} placeholder="例：3/24 午後" />
                        <Field label="見積金額 3" value={form.price3} onChange={(v) => updateForm("price3", v)} placeholder="例：79000" />
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <SelectField label="作業員" value={form.crew} onChange={(v) => updateForm("crew", v)} options={["2名", "3名", "4名"]} />
                        <SelectField label="トラック" value={form.truck} onChange={(v) => updateForm("truck", v)} options={["1tクラス", "2tクラス", "4tクラス"]} />
                        <SelectField label="保険" value={form.insurance} onChange={(v) => updateForm("insurance", v)} options={["あり", "簡易", "なし"]} />
                      </div>

                      <div className="mt-6">
                        <label className="block">
                          <div className="text-sm font-semibold text-navy">コメント</div>
                          <textarea
                            className="mt-2 min-h-[120px] w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/15"
                            placeholder="例：午後便の方が対応しやすいため価格を抑えています。"
                            value={form.comment}
                            onChange={(e) => updateForm("comment", e.target.value)}
                          />
                        </label>
                      </div>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <button
                          className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-navy hover:bg-bg"
                          onClick={() => setForm(initialForm)}
                        >
                          入力をクリア
                        </button>

                        <button
                          className="inline-flex h-12 items-center justify-center rounded-lg bg-cyan px-5 text-sm font-semibold text-white hover:bg-[#0891B2]"
                          onClick={submitQuote}
                        >
                          見積を提出する
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                      <div className="text-lg font-bold text-navy">発注連携済み一覧</div>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        発注先が決定し、電話番号連携まで完了した案件が表示されます。
                      </p>

                      <div className="mt-5 space-y-3">
                        {confirmedOrders.length === 0 ? (
                          <div className="rounded-xl border border-border bg-bg p-5 text-sm text-muted">
                            まだ発注連携済みの案件はありません。
                          </div>
                        ) : (
                          confirmedOrders.map((order) => (
                            <div
                              key={order.id}
                              className="rounded-2xl border border-border bg-bg p-4"
                            >
                              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                <div>
                                  <div className="text-sm font-bold text-navy">
                                    {order.customerName} / {order.company}
                                  </div>
                                  <div className="mt-1 text-xs text-muted">
                                    {order.plan} / {order.price}
                                  </div>
                                </div>

                                <span className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-navy">
                                  {order.status}
                                </span>
                              </div>

                              <div className="mt-4 grid gap-3 md:grid-cols-2">
                                <InfoCard title="電話番号" value={order.customerPhone} />
                                <InfoCard title="メール" value={order.customerEmail || "-"} />
                                <InfoCard title="作業員 / トラック" value={`${order.crew} / ${order.truck}`} />
                                <InfoCard title="保険" value={order.insurance} />
                              </div>

                              {(order.leadId || order.propertyName) && (
                                <div className="mt-4 rounded-xl border border-border bg-white p-4">
                                  <div className="text-xs text-muted">案内元情報</div>
                                  <div className="mt-2 text-sm leading-6 text-navy">
                                    案件ID: {order.leadId || "-"} / 案内元: {order.agentName || "-"} / 物件名: {order.propertyName || "-"}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-bg p-5">
                      <div className="text-sm font-semibold text-navy">Movisでの役割分担</div>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                        <li>・Movis：動画と条件を整理して案件化</li>
                        <li>・引越会社：動画を見て各社判断で価格提示</li>
                        <li>・発注確定後：電話番号を含む連携情報を受領</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: RequestStatus }) {
  if (status === "quoted") {
    return (
      <span className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-navy">
        提出済み
      </span>
    );
  }

  if (status === "reviewing") {
    return (
      <span className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
        確認中
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-muted">
      新着
    </span>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/60 bg-white p-4">
      <div className="text-xs text-muted">{title}</div>
      <div className="mt-1 text-sm font-semibold text-navy">{value}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="text-sm font-semibold text-navy">{label}</div>
      <input
        className="mt-2 h-12 w-full rounded-xl border border-border bg-bg px-4 text-sm text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/15"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <div className="text-sm font-semibold text-navy">{label}</div>
      <select
        className="mt-2 h-12 w-full rounded-xl border border-border bg-bg px-4 text-sm text-navy outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/15"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
