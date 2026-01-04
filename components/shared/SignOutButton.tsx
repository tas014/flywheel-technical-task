import { signOut } from "@/app/_lib/actions";

export default function SignOutButton() {
  return (
    <button
      onClick={signOut}
      className="px-4 py-2 rounded-lg bg-(--button-color) hover:bg-(--button-highlight) text-(--text-primary) font-medium transition-colors"
    >
      Sign Out
    </button>
  );
}
