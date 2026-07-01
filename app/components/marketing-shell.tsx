export function MarketingShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-5 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </main>
  );
}
