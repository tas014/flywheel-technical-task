import Header from "@/components/UI/Header";

export default function TaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-rows-[max-content_1fr_max-content]">
      <Header />
      <main className="overflow-y-auto px-4 py-8">{children}</main>
      <footer className="bg-[var(--background-soft)]">Project info: ...</footer>
    </div>
  );
}
