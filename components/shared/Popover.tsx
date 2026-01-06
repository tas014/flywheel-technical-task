"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";

type PopoverProps = {
  onClose: () => void;
  children: ReactNode;
  triggerRef?: RefObject<HTMLElement | null>;
  className?: string;
  align?: "left" | "right";
};

export default function Popover({
  onClose,
  children,
  triggerRef,
  className = "",
  align = "left",
}: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // If clicking inside the popover, do nothing
      if (popoverRef.current && popoverRef.current.contains(target)) {
        return;
      }

      // If clicking the trigger, let the trigger handle it (usually toggling)
      if (triggerRef?.current && triggerRef.current.contains(target)) {
        return;
      }

      onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, triggerRef]);

  return (
    <div
      ref={popoverRef}
      className={`absolute top-full mt-2 z-50 min-w-[200px] bg-(--bg-primary) border border-(--border-color) rounded-lg shadow-xl flex flex-col p-2 ${
        align === "right" ? "right-0" : "left-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
