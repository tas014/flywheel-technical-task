"use client";

import SignOutButton from "../shared/SignOutButton";
import ThemeSwitch from "../shared/ThemeSwitch";
import UserIcon from "./Icons/User";

export default function Header() {
  return (
    <header className="flex place-content-center p-5 bg-(--background-soft)">
      <div className="w-5/6 flex justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">Flywheel</h1>
        </div>
        <div className="flex place-content-center gap-4 items-center">
          <ThemeSwitch />
          <UserIcon />
          <span className="text-(--text-secondary) text-sm">Username</span>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
