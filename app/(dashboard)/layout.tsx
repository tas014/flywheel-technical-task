import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";

export default function TaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-rows-[max-content_1fr_max-content]">
      <Header />
      <main className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
        <div className="grid grid-rows-[auto 1fr] gap-3 p-5">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
