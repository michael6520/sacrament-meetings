import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

function getBaseUrl(): string {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export default async function MeetingsPage() {
  const res = await fetch(`${getBaseUrl()}/api/meetings`, {
    cache: "no-store",
  });
  const meetings: SacramentMeeting[] = await res.json();

  return (
    <div>
      <h2 className="text-2xl font-semibold text-foreground">All Meetings</h2>
      <div className="mt-4 space-y-4">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}