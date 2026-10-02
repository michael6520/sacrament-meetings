'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="rounded-card border border-border bg-card-bg p-6">
      <h2 className="text-lg font-semibold text-foreground">Something went wrong</h2>
      <p className="mt-2 text-sm text-foreground/70">
        We hit a problem loading or saving meetings. Please try again.
      </p>
      <div className="mt-4 flex items-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-card bg-primary px-4 py-2 text-sm font-medium text-background"
        >
          Try Again
        </button>
        <Link href="/meetings" className="text-sm text-primary hover:underline">
          Back to meetings
        </Link>
      </div>
    </div>
  );
}