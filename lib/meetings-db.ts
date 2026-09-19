import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 183, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10']
  },
  {
    id: 2,
    date: '2026-04-26',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Adams',
    openingHymn: { number: 59, title: 'Come, O Thou King of Kings' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: true,
    sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
    speakers: [
      { name: 'Brother White', topic: 'The Restoration', type: 'speaker' },
      { name: 'Sister Garcia', topic: 'The Book of Mormon', type: 'speaker' }
    ],
    closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'Brother Seymour',
    announcements: []
  },
  {
    id: 3,
    date: '2026-04-19',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Doe',
    openingHymn: { number: 97, title: 'Lead, Kindly Light' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 174, title: "While of These Emblems We Partake" },
    speakers: [
      { name: 'Sister Warren', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Sister Robinson', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 136, title: 'Gently Raise the Sacred Strain' },
    closingPrayer: 'Sister Davidson',
    announcements: []
  },
  {
    id: 4,
    date: '2026-04-12',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Smith',
    openingHymn: { number: 27, title: 'Praise to the Man' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 196, title: "Jesus, Once of Humble Birth" },
    speakers: [
      { name: 'Brother Booth', topic: 'Repentance', type: 'speaker' },
      { name: 'Brother Lyons', topic: 'Finding Opportunity to Serve', type: 'speaker' }
    ],
    closingHymn: { number: 129, title: 'Where Can I Turn for Peace?' },
    closingPrayer: 'Brother Rhodes',
    announcements: ['Ward activity: April 14th']
  },
  {
    id: 5,
    date: '2026-04-5',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Brother Stone',
    openingHymn: { number: 3, title: 'Now Let Us Rejoice' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [],
    closingHymn: { number: 58, title: 'Come, Ye Children of the Lord' },
    closingPrayer: 'Brother Russel',
    announcements: ['Youth Temple Trip: April 9th']
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}

