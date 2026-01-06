export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen flex justify-end bg-(--login-background)">
      <section className="w-2/5 flex justify-center items-center bg-(--background)">
        {children}
      </section>
    </main>
  );
}
