import Link from "next/link";

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="border-b border-border bg-card-bg py-3">
        <div className="mx-auto flex max-w-4xl justify-end px-6">
          <Link
            href="/meetings/current"
            className="text-sm text-foreground/70 hover:text-foreground"
          >
            Current Meeting
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-10">{children}</div>
    </div>
  );
}