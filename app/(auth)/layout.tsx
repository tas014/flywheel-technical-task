export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>
        <section>{children}</section>
      </main>
      <footer>Hi! I'm a footer</footer>
    </div>
  );
}
