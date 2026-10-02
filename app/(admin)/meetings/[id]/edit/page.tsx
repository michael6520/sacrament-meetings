import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { updateMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';
import { meetingToValues } from '@/lib/meeting-form-utils';

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) notFound();

  const meeting = await getMeetingById(id);
  if (!meeting) notFound();

  const updateMeetingWithId = updateMeeting.bind(null, id);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h2 className="text-2xl font-semibold text-foreground">Edit Meeting</h2>
      <MeetingForm
        action={updateMeetingWithId}
        initialValues={meetingToValues(meeting)}
        submitLabel="Save Changes"
      />
    </div>
  );
}