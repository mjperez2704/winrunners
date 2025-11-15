export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-20 bg-card rounded-lg" />
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-card rounded-lg" />
        ))}
      </div>
      <div className="h-96 bg-card rounded-lg" />
    </div>
  )
}
