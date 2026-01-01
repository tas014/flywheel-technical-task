import SignOutButton from "../shared/SignOutButton";

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-zinc-400 text-sm">User</p>
      </div>
      <SignOutButton />
    </header>
  );
}
