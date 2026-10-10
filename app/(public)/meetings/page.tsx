import Link from 'next/link';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import MeetingCard from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';
import { auth } from '@/auth';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Meetings",
  description: "Search and browse sacrament meeting agendas for the ward.",
};

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const session = await auth();
  const isOwner = !!session?.user;
  
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">All Meetings</h2>
        {isOwner && (
          <Link
            href="/meetings/new"
            className="rounded-card bg-primary px-4 py-2 text-sm font-medium text-background"
          >
            New Meeting
          </Link>
        )}
      </div>
      <div className="mt-4">
        <MeetingSearch />
      </div>
      <div className="mt-4 space-y-4">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} isOwner={isOwner} />
        ))}
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
}