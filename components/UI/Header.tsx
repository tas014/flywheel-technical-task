import { signOut } from "@/app/_lib/actions";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[var(--background-soft)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
        <h1>Hi! I'm a Header</h1>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </header>
  );
}
