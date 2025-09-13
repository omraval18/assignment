"use client";
import { GithubLogoIcon } from "@phosphor-icons/react";

export function Header() {
  return (
    <header className="w-full p-4 flex justify-between items-center border-b border-gray-200">
      <a href="https://omraval.live">
        <h1 className="text-sm font-sans tracking-tight font-medium">
          Contact
        </h1>
      </a>

      <a href="https://github.com/omraval18/assignment">
        <div className="flex items-center gap-2">
          <GithubLogoIcon className="size-5" weight="fill" />
          <p className="text-sm font-sans tracking-tight font-medium">
            {" "}
            Checkout the Code
          </p>
        </div>
      </a>
    </header>
  );
}
