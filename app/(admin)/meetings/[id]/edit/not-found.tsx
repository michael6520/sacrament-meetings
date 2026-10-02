import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <div className="rounded-card border border-border bg-card-bg p-6">
      <h2 className="text-lg font-semibold text-foreground">Meeting not found</h2>
      <p className="mt-2 text-sm text-foreground/70">
        We couldn&apos;t find a meeting with that ID. It may have been deleted.
      </p>
      <Link href="/meetings" className="mt-4 inline-block text-sm text-primary hover:underline">
        Back to meetings
      </Link>
    </div>
  );
}