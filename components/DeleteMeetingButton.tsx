'use client';

import { deleteMeeting } from '@/lib/actions';

export default function DeleteMeetingButton({ id, label }: { id: number; label: string }) {
  const action = deleteMeeting.bind(null, id);

  return (
    <form action={action}>
      <button
        type="submit"
        onClick={(e) => {
          if (!window.confirm(`Delete the meeting on ${label}? This cannot be undone.`)) {
            e.preventDefault();
          }
        }}
        className="text-sm text-red-400 hover:text-red-300"
      >
        Delete<span className="sr-only"> meeting on {label}</span>
      </button>
    </form>
  );
}