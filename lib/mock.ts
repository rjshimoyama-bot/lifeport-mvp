import type { Company, QuoteBundle } from "./types";

export const movingCompanies: Company[] = [
  { id: "a", name: "A社（ハート系）", note: "大型案件の運用に強い" },
  { id: "b", name: "B社", note: "コスパと対応のバランス" },
  { id: "c", name: "C社", note: "短距離に強い" },
  { id: "d", name: "D社", note: "梱包資材が充実" },
  { id: "e", name: "E社", note: "土日も柔軟" }
];

export function seedQuotes(params: {
  primaryDate: string;
  window: "0" | "3" | "7" | "wk";
  timeband: "am" | "pm" | "all";
}): QuoteBundle[] {
  const base = 85000;
  const dateLabels = buildDateLabels(params.primaryDate, params.window, params.timeband);

  return movingCompanies.map((c, idx) => {
    const rating = Math.max(3.8, 4.6 - idx * 0.15);

    const options = dateLabels.map((label, i) => {
      // “日程幅”がある時だけ、同一社内で安い日程が出る（効率ルートの再現）
      const efficiencyBoost =
        params.window !== "0" && i === 1 ? -12000 :
        params.window !== "0" && i === 2 ? -8000 : 0;

      const companyDelta = idx * 2500;
      const timebandDelta = params.timeband === "all" ? -3000 : 0;
      const price = base + companyDelta + timebandDelta + efficiencyBoost + jitter(idx, i);

      const insurance: "あり" | "簡易" | "なし" = idx === 1 ? "簡易" : "あり";
     return {
  id: `${c.id}-${i}`,
  label,
  price: Math.max(52000, round(price)),
  crew: idx <= 1 ? 2 : 3,
  boxes: 25 + idx * 5,
  insurance,
  hint: params.window !== "0" && i === 1 ? "既存ルートに組み込める可能性があり価格が抑えられています" : undefined
};
    });

    const basePriceMin = Math.min(...options.map((o) => o.price));
    return { company: c, rating, options, basePriceMin };
  });
}

function buildDateLabels(primaryISO: string, window: "0" | "3" | "7" | "wk", timeband: "am" | "pm" | "all") {
  const tb = timeband === "am" ? "午前" : timeband === "pm" ? "午後" : "終日";
  const d0 = primaryISO ? new Date(primaryISO + "T00:00:00") : new Date();

  const offsets =
    window === "0" ? [0] :
    window === "3" ? [0, 1, 3] :
    window === "7" ? [0, 2, 5] :
    [0, 2, 4];

  return offsets.map((off) => {
    const d = new Date(d0);
    d.setDate(d0.getDate() + off);
    return `${d.getMonth() + 1}/${d.getDate()} ${tb}`;
  });
}

function round(n: number) {
  return Math.round(n / 100) * 100;
}
function jitter(a: number, b: number) {
  const x = (a + 1) * 971 + (b + 3) * 433;
  return (x % 7) * 350;

}



