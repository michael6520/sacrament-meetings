import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl w-full px-6 py-10">
      <section className="relative mb-8 w-full aspect-[16/9] overflow-hidden rounded-card">
        <Image
          src="/chapel-hero.jpg"
          alt="Exterior view of a church meetinghouse"
          fill
          className="object-cover"
          priority
        />
      </section>

      <h2 className="text-2xl font-semibold text-foreground">
        Sacrament Meeting Planner
      </h2>
      <p className="mt-2 text-foreground/80">
        Browse upcoming and past sacrament meeting agendas for the ward.
      </p>
      <Link
        href="/meetings"
        className="mt-4 inline-block rounded-card bg-primary px-4 py-2 text-sm font-medium text-background"
      >
        View Meetings
      </Link>
    </main>
  );
}