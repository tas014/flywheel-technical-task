import { signOut } from "@/app/_lib/actions";

export default function SignOutButton() {
  return <button onClick={signOut}>Sign Out</button>;
}
