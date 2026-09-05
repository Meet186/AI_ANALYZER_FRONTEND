import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { CommandPalette } from "./CommandPalette";

export function AppShell() {
  const location = useLocation();
  const [paletteOpen, setPaletteOpen] = useState(false);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  useEffect(() => {
    function onKey(e) {
      const isK = e.key === "k" || e.key === "K";
      if (isK && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // close on route change
  useEffect(() => {
    setPaletteOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex bg-[var(--bg)] text-[var(--ink)] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(90,124,103,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(138,159,176,0.12),transparent_30%)]" />
      <Sidebar />
      <main className="relative flex-1 px-4 sm:px-6 md:px-8 py-5 md:py-6 max-w-[1600px] mx-auto w-full">
        <div className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)]/70 backdrop-blur-xl shadow-card p-3 sm:p-4 md:p-5">
          <Topbar onOpenPalette={openPalette} />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="pt-1"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <CommandPalette open={paletteOpen} onClose={closePalette} />
    </div>
  );
}
