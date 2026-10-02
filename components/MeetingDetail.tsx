import type { SacramentMeeting, Hymn } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

function HymnLine({ label, hymn }: { label: string; hymn: Hymn }) {
  return (
    <p className="text-sm text-foreground/80">
      <span className="font-medium text-foreground">{label}:</span>{" "}
      Hymn #{hymn.number} — {hymn.title}
    </p>
  );
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
    "en-US",
    { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <article className="rounded-card border border-border bg-card-bg p-6">
      <header className="border-b border-border pb-4">
        <h2 className="text-lg font-semibold text-foreground">{formattedDate}</h2>
        <p className="text-sm uppercase text-foreground/70">{meeting.meetingType} meeting</p>
        <p className="mt-2 text-sm text-foreground/80">Presiding: {meeting.presiding}</p>
        <p className="text-sm text-foreground/80">Conducting: {meeting.conducting}</p>
      </header>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="mt-4">
          <h3 className="font-medium text-foreground">Announcements</h3>
          <ul className="list-inside list-disc text-sm text-foreground/80">
            {meeting.announcements.map((item, index) => (
              <li key={index}>{item}</li> // what else am I supposed to use as the key? the sacrament meeting announcement thing has no id field
            ))}
          </ul>
        </section>
      )}

      <section className="mt-4 space-y-1">
        <HymnLine label="Opening Hymn" hymn={meeting.openingHymn} />
        <p className="text-sm text-foreground/80">
          <span className="font-medium text-foreground">Opening Prayer:</span>{" "}
          {meeting.openingPrayer}
        </p>
      </section>

      {meeting.wardBusiness.length > 0 && (
        <section className="mt-4">
          <h3 className="font-medium text-foreground">Ward Business</h3>
          <ul className="list-inside list-disc text-sm text-foreground/80">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        </section>
      )}

      {meeting.stakeBusiness && (
        <p className="mt-4 text-sm text-foreground/80">Stake business will be conducted.</p>
      )}

      <section className="mt-4">
        <HymnLine label="Sacrament Hymn" hymn={meeting.sacramentHymn} />
      </section>

      <section className="mt-4">
        <h3 className="font-medium text-foreground">Speakers</h3>
        <ul className="space-y-1 text-sm text-foreground/80">
          {meeting.speakers.map((speaker, index) => (
            <li key={index}>
              {speaker.type === "musical-number" ? (
                <>{speaker.name} — Musical Number</>
              ) : (
                <>{speaker.name} — {speaker.topic}</>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 space-y-1 border-t border-border pt-4">
        <HymnLine label="Closing Hymn" hymn={meeting.closingHymn} />
        <p className="text-sm text-foreground/80">
          <span className="font-medium text-foreground">Closing Prayer:</span>{" "}
          {meeting.closingPrayer}
        </p>
      </section>
    </article>
  );
}