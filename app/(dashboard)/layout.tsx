import Header from "@/components/UI/Header";

export default function TaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-rows-[max-content_1fr_max-content]">
      <Header />
      <main className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
        {children}
      </main>
      <footer className="bg-[var(--background-soft)]">Project info: ...</footer>
    </div>
  );
}
