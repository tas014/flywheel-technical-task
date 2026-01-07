"use client";

import { useState, useRef } from "react";
import SignOutButton from "../shared/SignOutButton";
import ThemeSwitch from "../shared/ThemeSwitch";
import Popover from "../shared/Popover";
import UserIcon from "./Icons/User";

export default function Header({ username }: { username: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="flex place-content-center p-5 bg-(--background-soft)">
      <div className="w-5/6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            Flywheel
          </h1>
        </div>

        <div className="relative">
          <button
            ref={triggerRef}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-(--bg-secondary) transition-colors cursor-pointer"
          >
            <UserIcon />
            <span className="text-(--text-secondary) text-sm font-medium">
              {username}
            </span>
          </button>

          {isOpen && (
            <Popover
              onClose={() => setIsOpen(false)}
              triggerRef={triggerRef}
              align="right"
              className="w-48 p-2"
            >
              <div className="flex flex-col gap-1">
                <ThemeSwitch />
                <div className="my-1 border-t border-(--border-color)" />
                <SignOutButton />
              </div>
            </Popover>
          )}
        </div>
      </div>
    </header>
  );
}
