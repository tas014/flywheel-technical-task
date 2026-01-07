import { signOut } from "@/app/_lib/actions";

export default function SignOutButton() {
  return (
    <button
      onClick={signOut}
      className="px-2 py-1 text-base hover:bg-(--button-color)/30 text-(--text-primary) font-medium transition-colors cursor-pointer"
    >
      Sign Out
    </button>
  );
}
