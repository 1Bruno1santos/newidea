export default function CastleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { castle: string }
}) {
  return (
    <div className="min-h-screen bg-black">
      {children}
    </div>
  )
}

