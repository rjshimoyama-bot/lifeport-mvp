import Link from "next/link";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-soft md:p-8">
      {children}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-medium text-navy">
      {children}
    </span>
  );
}

function PrimaryButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      className="inline-flex h-12 items-center justify-center rounded-lg bg-cyan px-5 text-sm font-semibold text-white transition hover:bg-[#0891B2] w-full sm:w-auto"
      href={href}
    >
      {children}
    </Link>
  );
}

function SecondaryButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      className="inline-flex h-12 items-center justify-center rounded-lg border border-navy bg-white px-5 text-sm font-semibold text-navy transition hover:bg-bg w-full sm:w-auto"
      href={href}
    >
      {children}
    </Link>
  );
}

function PortalCard({
  title,
  description,
  href,
  linkLabel,
}: {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
      <div className="text-lg font-bold text-navy">{title}</div>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
      <div className="mt-5">
        <Link
          href={href}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-bg px-4 text-sm font-semibold text-navy hover:bg-white"
        >
          {linkLabel}
        </Link>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1120px] px-4 py-6 md:px-6 md:py-8">
        <header className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold tracking-tight text-navy">Movis</div>
            <div className="text-xs text-muted">ムーヴィズ</div>
          </div>
          <Link className="text-sm font-medium text-muted hover:text-navy" href="/signup">
            見積もりをはじめる
          </Link>
        </header>

        <section className="mt-8 md:mt-12">
          <Card>
            <div className="flex flex-wrap gap-2">
              <Badge>動画査定</Badge>
              <Badge>電話なし</Badge>
              <Badge>複数社比較</Badge>
              <Badge>不動産導線</Badge>
            </div>

            <div className="mt-6 max-w-3xl">
              <h1 className="text-3xl font-bold leading-tight text-navy md:text-5xl">
                動画1本で、
                <br className="hidden sm:block" />
                引越し見積もりが変わる。
              </h1>
              <p className="mt-4 text-base leading-7 text-muted md:text-lg">
                訪問見積もりも、長い電話も不要。
                スマホで部屋を撮影するだけで、複数の引越会社から適正価格の見積もりが届きます。
                Movisは、不動産会社・引越会社・入居者をつなぐ引越しDXプラットフォームです。
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="/signup">無料で見積もりをはじめる</PrimaryButton>
              <SecondaryButton href="/quotes">デモを見る</SecondaryButton>
            </div>
          </Card>
        </section>

        <section className="mt-8 md:mt-10">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <div className="text-lg font-semibold text-navy">動画で簡単査定</div>
              <p className="mt-2 text-sm leading-6 text-muted">
                スマホで部屋を撮影するだけ。訪問見積もりなしで、引越しに必要な情報をまとめて伝えられます。
              </p>
            </Card>

            <Card>
              <div className="text-lg font-semibold text-navy">複数社を一括比較</div>
              <p className="mt-2 text-sm leading-6 text-muted">
                価格だけでなく、作業人数・条件・日程ごとの違いまで一覧で比較。納得して選べます。
              </p>
            </Card>

            <Card>
              <div className="text-lg font-semibold text-navy">チャットでそのまま決定</div>
              <p className="mt-2 text-sm leading-6 text-muted">
                気になる会社とはチャットで確認。電話に振り回されず、スムーズに引越しを決められます。
              </p>
            </Card>
          </div>
        </section>

        <section className="mt-8 md:mt-10">
          <Card>
            <div className="text-2xl font-bold text-navy">Movisの使い方</div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-border bg-bg p-5">
                <div className="text-sm font-semibold text-cyan">STEP 1</div>
                <div className="mt-2 text-lg font-semibold text-navy">動画を撮る</div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  ガイドに沿って、玄関・リビング・寝室などを撮影。所要時間は約3〜5分です。
                </p>
              </div>

              <div className="rounded-xl border border-border bg-bg p-5">
                <div className="text-sm font-semibold text-cyan">STEP 2</div>
                <div className="mt-2 text-lg font-semibold text-navy">見積もりが届く</div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  複数の引越会社が動画を確認し、価格・条件・日程別の見積もりを提示します。
                </p>
              </div>

              <div className="rounded-xl border border-border bg-bg p-5">
                <div className="text-sm font-semibold text-cyan">STEP 3</div>
                <div className="mt-2 text-lg font-semibold text-navy">比較して決定</div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  気になる会社とチャットで確認し、そのまま依頼。引越し準備タスクにもつながります。
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mt-8 md:mt-10">
          <Card>
            <div className="text-2xl font-bold text-navy">Movisポータル</div>
            <p className="mt-3 text-sm leading-6 text-muted">
              Movisは、入居者・引越会社・不動産会社の3者をつなぐ設計です。
              それぞれの立場に合わせた画面を用意しています。
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <PortalCard
                title="ユーザー向け"
                description="動画査定、見積比較、チャット確認、契約、引越し準備タスクまで一気通貫で利用できます。"
                href="/signup"
                linkLabel="ユーザー画面へ"
              />

              <PortalCard
                title="引越会社向け"
                description="案件一覧、動画確認、日程別見積の提出など、Movis経由の案件対応を管理できます。"
                href="/carrier"
                linkLabel="引越会社画面へ"
              />

              <PortalCard
                title="不動産会社向け"
                description="Movis案内状況、送客案件の進捗、案内リンク発行やSMS文面確認などができます。"
                href="/agent"
                linkLabel="不動産会社画面へ"
              />
            </div>
          </Card>
        </section>

        <section className="mt-8 md:mt-10">
          <Card>
            <div className="text-2xl font-bold text-navy">安心して使える設計</div>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
              <li>・電話番号は契約成立まで引越会社に公開されません</li>
              <li>・動画は見積もりのためだけに利用され、一定期間後に削除されます</li>
              <li>・価格だけでなく、条件や対応内容も含めて比較できます</li>
            </ul>

            <div className="mt-8 rounded-2xl border border-cyan/30 bg-cyan/10 p-5">
              <div className="text-xl font-bold text-navy">
                引越し見積もりを、もっとスマートに。
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">
                動画1本で、複数社から適正価格を。Movisで、新しい引越し体験を。
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="/signup">無料で見積もりをはじめる</PrimaryButton>
                <SecondaryButton href="/agent">不動産会社向け画面を見る</SecondaryButton>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
