import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";
import DeleteMeetingButton from "@/components/DeleteMeetingButton";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
    "en-US",
    { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <article className="rounded-card border border-border bg-card-bg transition-colors hover:border-primary">
      <Link href={`/meetings/${meeting.id}`} className="block p-4">
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
      <div className="flex items-center gap-4 border-t border-border px-4 py-2">
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="text-sm text-primary hover:underline"
        >
          Edit<span className="sr-only"> meeting on {formattedDate}</span>
        </Link>
        <DeleteMeetingButton id={meeting.id} label={formattedDate} />
      </div>
    </article>
  );
}