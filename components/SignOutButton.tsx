import { signOut } from '@/auth';

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/' });
      }}
    >
      <button type="submit" className="text-sm text-foreground/70 hover:text-foreground">
        Sign Out
      </button>
    </form>
  );
}