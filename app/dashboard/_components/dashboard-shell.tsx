export function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-foreground">
      <section className="relative mx-auto w-full max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <div>{children}</div>
      </section>
    </main>
  );
}
