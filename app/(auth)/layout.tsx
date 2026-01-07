export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen flex justify-end bg-gradient-to-r from-emerald-700 from-30% via-green-300 via-60% to-green-500 to-90%">
      <section className="w-full md:w-2/3 lg:w-3/5 flex justify-center items-center bg-(--background)/70">
        {children}
      </section>
    </main>
  );
}
