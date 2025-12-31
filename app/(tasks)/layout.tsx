export default function TaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-rows-[max-content_1fr_max-content]">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-(--background-soft) backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
          <h1>Hi! I'm a Header</h1>
        </div>
      </header>
      <main className="overflow-y-auto px-4 py-8">{children}</main>
      <footer className="bg-(--background-soft)">Project info: ...</footer>
    </div>
  );
}
