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

function PortalLoginCard({
  title,
  subtitle,
  href,
  action,
  tone = "default",
}: {
  title: string;
  subtitle: string;
  href: string;
  action: string;
  tone?: "default" | "cyan";
}) {
  const cardTone =
    tone === "cyan"
      ? "border-cyan/30 bg-cyan/10"
      : "border-border bg-white";

  return (
    <div className={`rounded-2xl border p-5 shadow-soft ${cardTone}`}>
      <div className="text-sm font-semibold text-muted">Portal</div>
      <div className="mt-2 text-xl font-bold text-navy">{title}</div>
      <p className="mt-2 text-sm leading-6 text-muted">{subtitle}</p>

      <div className="mt-5">
        <Link
          href={href}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-navy bg-white px-4 text-sm font-semibold text-navy hover:bg-bg w-full"
        >
          {action}
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
      <div className="text-lg font-semibold text-navy">{title}</div>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-bg p-5">
      <div className="text-sm font-semibold text-cyan">{step}</div>
      <div className="mt-2 text-lg font-semibold text-navy">{title}</div>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1180px] px-4 py-6 md:px-6 md:py-8">
        <header className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold tracking-tight text-navy">Movis</div>
            <div className="text-xs text-muted">ムーヴィズ</div>
          </div>

          <div className="hidden sm:block">
            <Link className="text-sm font-medium text-muted hover:text-navy" href="/signup">
              見積もりをはじめる
            </Link>
          </div>
        </header>

        <section className="mt-8 md:mt-12">
          <Card>
            <div className="flex flex-wrap gap-2">
              <Badge>動画査定</Badge>
              <Badge>複数社比較</Badge>
              <Badge>電話なし</Badge>
              <Badge>不動産導線</Badge>
              <Badge>引越会社ダッシュボード</Badge>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <h1 className="text-3xl font-bold leading-tight text-navy md:text-5xl">
                  動画1本で、
                  <br className="hidden sm:block" />
                  引越し見積もりが変わる。
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
                  訪問見積もりも、長い電話も不要。
                  スマホで部屋を撮影するだけで、複数の引越会社から適正価格の見積もりが届きます。
                  Movisは、入居者・引越会社・不動産会社をつなぐ引越しDXプラットフォームです。
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <PrimaryButton href="/signup">無料で見積もりをはじめる</PrimaryButton>
                  <SecondaryButton href="/quotes">ユーザーデモを見る</SecondaryButton>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-bg p-5">
                <div className="text-sm font-semibold text-muted">Portal Access</div>
                <div className="mt-2 text-xl font-bold text-navy">
                  Movis ポータル入口
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  利用者ごとに、最適な画面へ進めます。
                </p>

                <div className="mt-5 space-y-3">
                  <PortalLoginCard
                    title="ユーザー向け"
                    subtitle="動画査定、見積比較、チャット確認、契約、引越し準備へ"
                    href="/signup"
                    action="ユーザー画面へ"
                    tone="cyan"
                  />
                  <PortalLoginCard
                    title="引越会社向け"
                    subtitle="案件確認、動画確認、日程別見積提出"
                    href="/carrier"
                    action="引越会社画面へ"
                  />
                  <PortalLoginCard
                    title="不動産会社向け"
                    subtitle="送客管理、案内リンク発行、進捗確認"
                    href="/agent"
                    action="不動産会社画面へ"
                  />
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="mt-8 md:mt-10">
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              title="動画で簡単査定"
              description="スマホで部屋を撮影するだけ。訪問見積もりなしで、引越しに必要な情報をまとめて伝えられます。"
            />
            <FeatureCard
              title="複数社を一括比較"
              description="価格だけでなく、作業人数・条件・日程ごとの違いまで一覧で比較。納得して選べます。"
            />
            <FeatureCard
              title="チャットでそのまま決定"
              description="気になる会社とはチャットで確認。電話に振り回されず、スムーズに引越しを決められます。"
            />
          </div>
        </section>

        <section className="mt-8 md:mt-10">
          <Card>
            <div className="text-2xl font-bold text-navy">Movisの使い方</div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <StepCard
                step="STEP 1"
                title="動画を撮る"
                description="ガイドに沿って、玄関・リビング・寝室などを撮影。所要時間は約3〜5分です。"
              />
              <StepCard
                step="STEP 2"
                title="見積もりが届く"
                description="複数の引越会社が動画を確認し、価格・条件・日程別の見積もりを提示します。"
              />
              <StepCard
                step="STEP 3"
                title="比較して決定"
                description="気になる会社とチャットで確認し、そのまま依頼。引越し準備タスクにもつながります。"
              />
            </div>
          </Card>
        </section>

        <section className="mt-8 md:mt-10">
          <Card>
            <div className="text-2xl font-bold text-navy">Movisは3者をつなぐプラットフォーム</div>
            <p className="mt-3 text-sm leading-6 text-muted">
              Movisは、入居者・引越会社・不動産会社がそれぞれの役割でつながる設計です。
              ただの引越し見積サイトではなく、入退去接点を活用するDX基盤として拡張できます。
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card>
                <div className="text-lg font-semibold text-navy">入居者</div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  動画査定、見積比較、チャット確認、契約、引越し準備タスクまで一気通貫で利用できます。
                </p>
                <div className="mt-5">
                  <Link
                    href="/signup"
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-bg px-4 text-sm font-semibold text-navy hover:bg-white"
                  >
                    ユーザー導線を見る
                  </Link>
                </div>
              </Card>

              <Card>
                <div className="text-lg font-semibold text-navy">引越会社</div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  案件一覧、動画確認、日程別見積の提出など、Movis経由の案件対応を管理できます。
                </p>
                <div className="mt-5">
                  <Link
                    href="/carrier"
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-bg px-4 text-sm font-semibold text-navy hover:bg-white"
                  >
                    引越会社画面を見る
                  </Link>
                </div>
              </Card>

              <Card>
                <div className="text-lg font-semibold text-navy">不動産会社</div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Movis案内状況、送客案件の進捗、案内リンク発行やSMS文面確認などができます。
                </p>
                <div className="mt-5">
                  <Link
                    href="/agent"
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-bg px-4 text-sm font-semibold text-navy hover:bg-white"
                  >
                    不動産会社画面を見る
                  </Link>
                </div>
              </Card>
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
