import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";
import { createClient } from "@/lib/supabase/server";

export default async function TaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const username = user?.email?.split("@")[0] || "User";

  return (
    <>
      <Header username={username} />
      <main className="min-h-screen md:p-4 lg:p-6">
        <div className="grid grid-rows-[auto 1fr] gap-3 px-2 py-5 lg:px-5">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
