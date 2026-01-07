import { signOut } from "@/app/_lib/actions";

export default function SignOutButton() {
  return (
    <button
      onClick={signOut}
      className="w-full text-left px-2 py-1.5 rounded-md text-sm text-(--text-secondary) hover:bg-(--button-color)/30 transition-colors cursor-pointer"
    >
      Sign Out
    </button>
  );
}
