import MeetingForm from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';
import { emptyValues } from '@/lib/meeting-form-utils';

export default function NewMeetingPage() {
  return (
    <div className="mt-4 space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">New Meeting</h2>
      <MeetingForm
        action={createMeeting}
        initialValues={emptyValues}
        submitLabel="Create Meeting"
      />
    </div>
  );
}