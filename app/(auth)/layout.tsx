export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen flex justify-end bg-(--login-background)">
      <section className="w-full md:w-3/5 lg:w-2/5 flex justify-center items-center bg-(--background)">
        {children}
      </section>
    </main>
  );
}
