import { motion } from "framer-motion";

const NOISE_DATA_URI =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' seed='3'/></filter><rect width='180' height='180' filter='url(%23n)' opacity='0.75'/></svg>\")";

export function DarkPanel({ className = "", children, glow = true, radius = "rounded-[32px]" }) {
  return (
    <div className={`relative overflow-hidden isolate ${radius} ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #081521 0%, #0f2740 28%, #1b496e 58%, #0b1726 100%)",
        }}
      />

      {glow && (
        <>
          <motion.div
            className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(164,205,255,0.34) 0%, rgba(99,167,245,0.18) 35%, transparent 72%)",
              filter: "blur(70px)",
            }}
            animate={{ x: [0, 26, 0], y: [0, 18, 0], opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-32 -left-28 w-[480px] h-[480px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(94,177,225,0.34) 0%, rgba(40,116,177,0.18) 38%, transparent 72%)",
              filter: "blur(70px)",
            }}
            animate={{ x: [0, -26, 0], y: [0, -24, 0], opacity: [0.4, 0.68, 0.4] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
          backgroundSize: "220% 220%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: NOISE_DATA_URI }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 180px 14px rgba(0,0,0,0.38)" }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
