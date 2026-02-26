export type QuoteOption = {
  id: string;
  label: string; // "3/26 終日" 等
  price: number;
  crew: number;
  boxes: number;
  insurance: "あり" | "簡易" | "なし";
  hint?: string;
};

export type Company = {
  id: string;
  name: string;
  note: string;
};

export type QuoteBundle = {
  company: Company;
  rating: number;
  options: QuoteOption[];
  basePriceMin: number;
};