export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
      <footer>Hi! I'm a footer</footer>
    </div>
  );
}
