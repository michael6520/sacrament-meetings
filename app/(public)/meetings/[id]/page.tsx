import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import DeleteMeetingButton from "@/components/DeleteMeetingButton";
import type { SacramentMeeting } from "@/lib/types";
import { auth } from "@/auth";
import type { Metadata } from "next";
import { getMeetingById } from "@/lib/meetings-db";

export async function generateMetadata({
  params,
}: MeetingPageProps): Promise<Metadata> {
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!Number.isInteger(id) || id < 1) {
    return { title: "Invalid Meeting" };
  }

  const meeting = await getMeetingById(id);
  if (!meeting) {
    return {
      title: "Meeting Not Found",
      description: "The requested meeting could not be found.",
    };
  }

  const label = new Date(`${meeting.date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return {
    title: `Sacrament Meeting, ${label}`,
    description: `Agenda for the sacrament meeting on ${label}.`,
    openGraph: {
      title: `Sacrament Meeting, ${label}`,
      description: `Agenda for the sacrament meeting on ${label}.`,
    },
  };
}

function getBaseUrl(): string {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;

  const res = await fetch(`${getBaseUrl()}/api/meetings/${id}`, {
    cache: "no-store",
  });

  if (res.status === 400) {
    return (
      <div className="rounded-card border border-border bg-card-bg p-6">
        <h2 className="text-lg font-semibold text-foreground">Invalid meeting ID</h2>
        <p className="mt-2 text-sm text-foreground/70">
          &quot;{id}&quot; isn&apos;t a valid meeting ID. Meeting IDs must be numbers.
        </p>
      </div>
    );
  }

  if (res.status === 404) {
    notFound();
  }

  const meeting: SacramentMeeting = await res.json();
  const label = new Date(`${meeting.date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const session = await auth();

  return (
    <div className="space-y-4">
      {session?.user && (
        <div className="flex items-center gap-4">
          <Link href={`/meetings/${meeting.id}/edit`} className="text-sm text-primary hover:underline">
            Edit
          </Link>
          <DeleteMeetingButton id={meeting.id} label={label} />
        </div>
      )}
      <MeetingDetail meeting={meeting} />
    </div>
  );
}