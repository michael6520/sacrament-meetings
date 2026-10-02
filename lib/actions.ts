'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect, notFound } from 'next/navigation';
import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingInDb,
} from './meetings-db';
import {
  emptyValues,
  parseSpeakers,
  speakersAreValid,
  splitLines,
  type FormState,
  type FormValues,
} from './meeting-form-utils';
import type { SacramentMeeting } from './types';

const hymnNumber = z.coerce
  .number()
  .int('Hymn number must be a whole number.')
  .min(1, 'Enter a hymn number.')
  .max(1000, 'Hymn number is too large.');

const required = (label: string) =>
  z.string().trim().min(1, `${label} is required.`).max(200, `${label} is too long.`);

const MeetingFormSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Choose a meeting date.'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general'], {
    message: 'Select a meeting type.',
  }),
  presiding: required('Presiding'),
  conducting: required('Conducting'),
  announcements: z.string(),
  openingHymnNumber: hymnNumber,
  openingHymnTitle: required('Opening hymn title'),
  openingPrayer: required('Opening prayer'),
  wardBusiness: z.string(),
  stakeBusiness: z.boolean(),
  sacramentHymnNumber: hymnNumber,
  sacramentHymnTitle: required('Sacrament hymn title'),
  speakers: z
    .string()
    .trim()
    .min(1, 'Add at least one speaker or musical number.')
    .refine(speakersAreValid, 'Each line needs a name before the "|".'),
  closingHymnNumber: hymnNumber,
  closingHymnTitle: required('Closing hymn title'),
  closingPrayer: required('Closing prayer'),
});

type ParsedForm = z.infer<typeof MeetingFormSchema>;

function readRawValues(formData: FormData): FormValues {
  const values: FormValues = {};
  for (const key of Object.keys(emptyValues)) {
    values[key] = String(formData.get(key) ?? '');
  }
  return values;
}

function validate(formData: FormData):
  | { ok: true; data: Omit<SacramentMeeting, 'id'> }
  | { ok: false; state: FormState } {
  const values = readRawValues(formData);
  const parsed = MeetingFormSchema.safeParse({
    ...values,
    stakeBusiness: values.stakeBusiness === 'on',
  });

  if (!parsed.success) {
    return {
      ok: false,
      state: {
        message: 'Please fix the errors below and try again.',
        errors: parsed.error.flatten().fieldErrors as FormState['errors'],
        values,
      },
    };
  }

  const d: ParsedForm = parsed.data;
  return {
    ok: true,
    data: {
      date: d.date,
      meetingType: d.meetingType,
      presiding: d.presiding,
      conducting: d.conducting,
      announcements: splitLines(d.announcements),
      openingHymn: { number: d.openingHymnNumber, title: d.openingHymnTitle },
      openingPrayer: d.openingPrayer,
      wardBusiness: splitLines(d.wardBusiness).map((description) => ({ description })),
      stakeBusiness: d.stakeBusiness,
      sacramentHymn: { number: d.sacramentHymnNumber, title: d.sacramentHymnTitle },
      speakers: parseSpeakers(d.speakers),
      closingHymn: { number: d.closingHymnNumber, title: d.closingHymnTitle },
      closingPrayer: d.closingPrayer,
    },
  };
}

export async function createMeeting(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = validate(formData);
  if (!result.ok) return result.state;

  try {
    await addMeeting(result.data);
  } catch (error) {
    console.error('createMeeting failed:', error);
    throw new Error('Could not create the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = validate(formData);
  if (!result.ok) return result.state;

  let updated: SacramentMeeting | null;
  try {
    updated = await updateMeetingInDb(id, result.data);
  } catch (error) {
    console.error('updateMeeting failed:', error);
    throw new Error('Could not update the meeting. Please try again.');
  }

  if (!updated) notFound();

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
  try {
    await deleteMeetingInDb(id);
  } catch (error) {
    console.error('deleteMeeting failed:', error);
    throw new Error('Could not delete the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}