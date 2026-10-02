'use client';

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav aria-label="Pagination" className="mt-6 flex items-center justify-between text-sm">
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-card border border-border px-3 py-1.5 text-foreground/80 hover:border-primary hover:text-foreground"
        >
          Previous
        </Link>
      ) : (
        <span />
      )}

      <span className="text-foreground/70">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-card border border-border px-3 py-1.5 text-foreground/80 hover:border-primary hover:text-foreground"
        >
          Next
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}