"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "../components/ToggleButton";

const categories = [
  { title: "Tech", slug: "tech" },
  { title: "Gaming", slug: "video-games" },
  { title: "Random", slug: "random" },
  { title: "Food", slug: "food" },
  { title: "Travel", slug: "travel" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative ">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4">

        {/* Left spacer (keeps logo truly centered) */}
        <div className="flex-1" />
        <div className="px-4" >
          <ThemeToggle />
        </div>
          
        {/* Center logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2"
        >
          {/* Light mode logo */}
          <Image
            src="/logoo.png"
            alt="logo"
            width={200}
            height={40}
            className="mt-5"
            priority
          />

          {/* Dark mode logo
          <Image
            src="/logo/coder-chaos-dark.png"
            alt="Coder Chaos logo"
            width={140}
            height={40}
            className="hidden dark:block"
            priority
          /> */}
          
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
          className="ml-auto rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-white/80"
        >
          <span className="block h-0.5 w-6 bg-neutral-900 dark:bg-neutral-100 mb-1" />
          <span className="block h-0.5 w-6 bg-neutral-900 dark:bg-neutral-100 mb-1" />
          <span className="block h-0.5 w-6 bg-neutral-900 dark:bg-neutral-100" />
        </button>
      </div>

      {/* Mobile menu */}
      {/* Backdrop */}
{open && (
  <div
    className="fixed inset-0 z-40 bg-black/30"
    onClick={() => setOpen(false)}
  />
)}

{/* Right-side menu */}
<div
  className={`fixed top-0 right-0 z-50 h-full text-white/80 w-64 bg-zinc-50 dark:bg-zinc-950 transform border-l border-neutral-200 dark:border-neutral-800 transition-transform duration-300 ease-in-out
    ${open ? "translate-x-0" : "translate-x-full "}
  `}
>
  <div className="flex h-16 items-center justify-end px-4 ">
    <button
      onClick={() => setOpen(false)}
      aria-label="Close menu"
      className="rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 "
    >
      ✕
    </button>
  </div>

  <nav className="flex flex-col gap-6 px-6 pt-8 text-white/80">
  {categories.map((cat) => (
    <Link
      key={cat.slug}
      href={`/category/${cat.slug}`}
      onClick={() => setOpen(false)}
    >
      {cat.title}
    </Link>
    
  ))}
</nav>

      </div>
    </nav>
  );
}
