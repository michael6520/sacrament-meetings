export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-card-bg px-6 py-4">
      <div className="mx-auto max-w-4xl text-center text-sm text-foreground/70">
        <p>Michael Miller &copy; {year} | Sacrament Meeting Planner | WDD 430.</p>
      </div>
    </footer>
  );
}