import Link from "next/link";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-white p-8 shadow-soft">
      {children}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs text-navy">
      {children}
    </span>
  );
}

function Button({
  children,
  href
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      className="inline-flex h-12 items-center justify-center rounded-lg bg-cyan px-4 text-sm font-medium text-white hover:bg-[#0891B2]"
      href={href}
    >
      {children}
    </Link>
  );
}

export default function Page() {
  return (
    <div className="mx-auto max-w-[960px] px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-navy font-semibold text-lg">Movis（ムーヴィズ）</div>
        <Link className="text-sm text-muted hover:underline" href="/signup">
          はじめる
        </Link>
      </div>

      <Card>
        <div className="mb-4 flex gap-2 flex-wrap">
          <Badge>不動産会社経由</Badge>
          <Badge>電話レス</Badge>
          <Badge>透明性重視</Badge>
          <Badge>日程幅×価格最適化</Badge>
        </div>

        <h1 className="text-navy text-3xl font-semibold leading-tight">
          動画1本で、複数社から適正価格の見積もり。
        </h1>
        <p className="mt-3 text-muted">
          日程に少し余裕を持つだけで、引越会社が効率的なルートに組み込める場合があり、価格が抑えられることがあります。
          電話対応は原則不要です。
        </p>

        <div className="mt-6 flex gap-3 flex-wrap">
          <Button href="/signup">無料で見積をはじめる</Button>
          <Link
            className="inline-flex h-12 items-center justify-center rounded-lg border border-navy bg-white px-4 text-sm font-medium text-navy hover:bg-bg"
            href="/quotes"
          >
            デモ（見積画面）
          </Link>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-5 shadow-soft">
          <div className="text-navy font-semibold">① 動画撮影</div>
          <p className="mt-2 text-sm text-muted">ガイドに沿って約3〜5分。訪問見積は不要。</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-5 shadow-soft">
          <div className="text-navy font-semibold">② 見積比較</div>
          <p className="mt-2 text-sm text-muted">会社×日程で価格・条件を比較。価格順に煽りません。</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-5 shadow-soft">
          <div className="text-navy font-semibold">③ チャットで決定</div>
          <p className="mt-2 text-sm text-muted">疑問点はチャットで確認。成約後に連絡先開示。</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-white p-6 shadow-soft">
        <h2 className="text-navy font-semibold">安心設計</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-muted space-y-1">
          <li>電話番号は成約後まで引越会社へ公開しません</li>
          <li>動画は提出後の一定期間を想定し、自動削除方針（MVPは表示のみ）</li>
          <li>価格は“最安保証”ではなく“合理性に基づく適正化”を重視</li>
        </ul>
      </div>
    </div>
  );
}
