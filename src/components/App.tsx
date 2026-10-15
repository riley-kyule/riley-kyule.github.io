import type { ReactNode } from "react";
import { ScrollProvider } from "@/lib/scroll";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";
import { RevealObserver } from "./ui/RevealObserver";

/** Page shell: Lenis, reveal-on-scroll, navigation and footer around the page content. */
export function App({ children, home = true }: { children: ReactNode; home?: boolean }) {
  return (
    <ScrollProvider>
      <a className="skip" href="#main">Skip to content</a>
      <Navigation home={home} />
      <main id="main">{children}</main>
      <Footer home={home} />
      <RevealObserver />
    </ScrollProvider>
  );
}
