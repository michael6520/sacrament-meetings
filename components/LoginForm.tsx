'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="mt-4 space-y-4 rounded-card border border-border bg-card-bg p-6">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <div>
        <label htmlFor="email" className="block text-sm text-foreground/70">Email</label>
        <input
          id="email" name="email" type="email" required
          className="mt-1 w-full rounded-card border border-border bg-background px-3 py-2 text-foreground"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm text-foreground/70">Password</label>
        <input
          id="password" name="password" type="password" minLength={6} required
          className="mt-1 w-full rounded-card border border-border bg-background px-3 py-2 text-foreground"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="rounded-card bg-primary px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
      >
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
      {errorMessage && <p role="alert" className="text-sm text-red-400">{errorMessage}</p>}
    </form>
  );
}