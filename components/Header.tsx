const WARD_NAME = "Monarch Meadows Ward";
import NavLinks from "@/components/NavLinks"
import Link from 'next/link';
import { auth } from '@/auth';
import SignOutButton from '@/components/SignOutButton';

export default async function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const session = await auth();

  return (
    <header className="border-b border-border bg-card-bg py-4">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6">
        <h1 className="text-xl font-semibold text-foreground">{WARD_NAME}</h1>
        <p className="text-sm text-foreground/70">{today}</p>
      </div>
      <div className="mx-auto max-w-4xl px-6 pt-5 flex justify-between">
        <NavLinks />
        {session?.user ? <SignOutButton /> : <Link href="/login" className="text-sm text-primary hover:underline">Sign In</Link>}
      </div>
    </header>
  );
}