"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b">
      <h1 className="text-xl font-bold">Movie Explorer</h1>
      <nav>
        <Link href="/" className="px-4">Home</Link>
        <Link href="/favorites" className="px-4">Favorite Movies</Link>
      </nav>
    </header>
  );
}
