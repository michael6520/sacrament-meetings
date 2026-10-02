import type { SacramentMeeting, SpeakerItem } from './types';

export type FormValues = Record<string, string>;

export type FormState = {
  message: string | null;
  errors: Record<string, string[] | undefined>;
  values: FormValues;
};

export const emptyValues: FormValues = {
  date: '',
  meetingType: '',
  presiding: '',
  conducting: '',
  announcements: '',
  openingHymnNumber: '',
  openingHymnTitle: '',
  openingPrayer: '',
  wardBusiness: '',
  stakeBusiness: '',
  sacramentHymnNumber: '',
  sacramentHymnTitle: '',
  speakers: '',
  closingHymnNumber: '',
  closingHymnTitle: '',
  closingPrayer: '',
};

export function splitLines(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parseSpeakers(text: string): SpeakerItem[] {
  return splitLines(text).map((line) => {
    const [name, ...rest] = line.split('|');
    const topic = rest.join('|').trim();
    const isMusical = /^musical( number)?$/i.test(topic);
    return {
      name: name.trim(),
      topic: isMusical ? '' : topic,
      type: isMusical ? 'musical-number' : 'speaker',
    };
  });
}

export function speakersAreValid(text: string): boolean {
  return splitLines(text).every((line) => line.split('|')[0].trim().length > 0);
}

export function formatSpeakers(speakers: SpeakerItem[]): string {
  return speakers
    .map(
      (s) =>
        `${s.name} | ${s.type === 'musical-number' ? 'Musical Number' : s.topic}`
    )
    .join('\n');
}

export function meetingToValues(m: SacramentMeeting): FormValues {
  return {
    date: m.date,
    meetingType: m.meetingType,
    presiding: m.presiding,
    conducting: m.conducting,
    announcements: (m.announcements ?? []).join('\n'),
    openingHymnNumber: String(m.openingHymn.number),
    openingHymnTitle: m.openingHymn.title,
    openingPrayer: m.openingPrayer,
    wardBusiness: m.wardBusiness.map((w) => w.description).join('\n'),
    stakeBusiness: m.stakeBusiness ? 'on' : '',
    sacramentHymnNumber: String(m.sacramentHymn.number),
    sacramentHymnTitle: m.sacramentHymn.title,
    speakers: formatSpeakers(m.speakers),
    closingHymnNumber: String(m.closingHymn.number),
    closingHymnTitle: m.closingHymn.title,
    closingPrayer: m.closingPrayer,
  };
}