import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
    "en-US",
    { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="block rounded-card border border-border bg-card-bg p-4 transition-colors hover:border-primary"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">{formattedDate}</h3>
        <span className="rounded-card bg-background px-2 py-1 text-xs uppercase text-foreground/70">
          {meeting.meetingType}
        </span>
      </div>
      <p className="mt-2 text-sm text-foreground/70">
        Presiding: {meeting.presiding}
      </p>
    </Link>
  );
}