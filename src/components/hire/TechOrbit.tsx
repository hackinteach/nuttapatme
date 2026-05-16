import { motion } from "framer-motion";
import {
  siKubernetes,
  siDocker,
  siTerraform,
  siGooglecloud,
  siHelm,
  siJenkins,
  siGo,
  siArgo,
} from "simple-icons";
import { Server } from "lucide-react";

type SiIcon = { title: string; path: string; hex: string };

type OrbItem = {
  icon: SiIcon;
  label: string;
};

// Two concentric rings, counter-rotating. Inner = container runtime tier,
// outer = platform/automation tier.
const INNER_RING: OrbItem[] = [
  { icon: siKubernetes, label: "K8s" },
  { icon: siDocker, label: "Docker" },
  { icon: siTerraform, label: "Terraform" },
];

const OUTER_RING: OrbItem[] = [
  { icon: siGooglecloud, label: "GCP" },
  { icon: siHelm, label: "Helm" },
  { icon: siJenkins, label: "Jenkins" },
  { icon: siGo, label: "Go" },
  { icon: siArgo, label: "Argo" },
];

const INNER_RADIUS_PCT = 28; // % of container — small enough to fit inside outer ring
const OUTER_RADIUS_PCT = 46;

const INNER_DURATION = 32; // seconds for full rotation
const OUTER_DURATION = 48;

function IconBadge({ item }: { item: OrbItem }) {
  const { icon, label } = item;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="w-11 h-11 rounded-xl glass grid place-items-center"
        style={{ boxShadow: `0 0 24px -8px #${icon.hex}` }}
      >
        <svg
          viewBox="0 0 24 24"
          width={22}
          height={22}
          fill={`#${icon.hex}`}
          aria-label={icon.title}
        >
          <path d={icon.path} />
        </svg>
      </div>
      <span className="text-[10px] font-mono uppercase tracking-wider text-white/55">
        {label}
      </span>
    </div>
  );
}

/** Places `count` items evenly around a circle of `radiusPct`% within the parent. */
function placed(items: OrbItem[], radiusPct: number, counterRotateDuration: number) {
  return items.map((item, i) => {
    const angle = (i / items.length) * 2 * Math.PI;
    const x = Math.cos(angle) * radiusPct;
    const y = Math.sin(angle) * radiusPct;
    return (
      <div
        key={item.label}
        className="absolute top-1/2 left-1/2"
        style={{
          transform: `translate(calc(-50% + ${x}%), calc(-50% + ${y}%))`,
        }}
      >
        {/* Counter-rotate to keep the badge upright while the parent rotates. */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: counterRotateDuration, repeat: Infinity, ease: "linear" }}
        >
          <IconBadge item={item} />
        </motion.div>
      </div>
    );
  });
}

export function TechOrbit() {
  return (
    <div className="relative w-full aspect-square max-w-[520px] mx-auto select-none">
      {/* Concentric ring guides */}
      <div className="absolute inset-[7%] rounded-full border border-white/[0.06]" />
      <div className="absolute inset-[20%] rounded-full border border-white/[0.07]" />
      <div className="absolute inset-[36%] rounded-full border border-white/[0.08]" />

      {/* Soft radial glow behind the hub */}
      <div className="absolute inset-[36%] rounded-full bg-[var(--color-accent)]/10 blur-2xl" />

      {/* Center hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-2xl glass grid place-items-center text-[var(--color-accent)]"
          style={{ boxShadow: "0 0 40px -8px rgba(124, 92, 255, 0.5)" }}
        >
          <Server size={26} />
        </motion.div>
      </div>

      {/* Outer ring (slower, clockwise) */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: OUTER_DURATION, repeat: Infinity, ease: "linear" }}
      >
        {placed(OUTER_RING, OUTER_RADIUS_PCT, OUTER_DURATION)}
      </motion.div>

      {/* Inner ring (faster, counter-clockwise) */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: INNER_DURATION, repeat: Infinity, ease: "linear" }}
      >
        {placed(INNER_RING, INNER_RADIUS_PCT, -INNER_DURATION)}
      </motion.div>
    </div>
  );
}
