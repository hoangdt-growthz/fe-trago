export default function HomeLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pb-10 pt-6 sm:px-6">
      <div className="soft-panel mb-4 animate-pulse rounded-3xl p-4 sm:p-5">
        <div className="mb-4 h-5 w-28 rounded bg-muted" />
        <div className="mb-2 h-9 w-2/3 rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_190px_auto]">
          <div className="h-11 rounded-2xl bg-muted" />
          <div className="h-11 rounded-2xl bg-muted" />
          <div className="h-11 rounded-2xl bg-muted" />
        </div>
      </div>

      <section className="grid gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="aspect-[4/3] animate-pulse bg-muted sm:aspect-[16/10]" />
            <div className="p-4">
              <div className="mb-2 h-5 w-2/3 animate-pulse rounded bg-muted" />
              <div className="mb-2 h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
