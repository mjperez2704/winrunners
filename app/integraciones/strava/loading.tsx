export default function Loading() {
  return (
    <div className="p-6 space-y-6">
      <div className="h-16 w-96 bg-muted animate-pulse rounded" />
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  )
}
