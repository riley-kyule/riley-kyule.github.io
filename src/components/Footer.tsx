import Link from "next/link";
import { PROFILE } from "@/lib/data";

export function Footer({ home = true }: { home?: boolean }) {
  return (
    <footer className="border-t border-black/10 py-7 text-[0.88rem] text-label">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <span>
          © {new Date().getFullYear()} {PROFILE.name}
        </span>
        {home ? (
          <a className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-ink" href="#top">Back to top ↑</a>
        ) : (
          <Link className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-ink" href="/">Back to home</Link>
        )}
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
