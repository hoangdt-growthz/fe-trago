export default function PlaceDetailLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pb-10 pt-6 sm:px-6">
      <div className="mb-4 h-10 w-24 animate-pulse rounded-xl bg-muted" />

      <div className="mb-4 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="aspect-[4/3] animate-pulse bg-muted sm:aspect-[16/9]" />
        <div className="space-y-3 p-5">
          <div className="h-7 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-16 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-3 sm:p-4">
        <div className="h-64 animate-pulse rounded-2xl bg-muted" />
      </div>
    </main>
  );
}
