import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig, MUSIC_TRACKS } from "../config/birthdayConfig";
import type { MusicTrack } from "../config/birthdayConfig";
import StarField from "../components/StarField";

// ── Types ──────────────────────────────────────────────────────────────
type Section =
  | "general"
  | "intro"
  | "nameReveal"
  | "memories"
  | "letter"
  | "wishes"
  | "miniGame"
  | "finalGift"
  | "music";

const NAV: { id: Section; label: string; icon: string }[] = [
  { id: "general", label: "General", icon: "⚙️" },
  { id: "music", label: "Music", icon: "🎵" },
  { id: "intro", label: "Opening Screen", icon: "✨" },
  { id: "nameReveal", label: "Name Reveal", icon: "🌷" },
  { id: "memories", label: "Memory Archive", icon: "📁" },
  { id: "letter", label: "Birthday Letter", icon: "💌" },
  { id: "wishes", label: "Wishes Cards", icon: "🌟" },
  { id: "miniGame", label: "Mini Game", icon: "🎮" },
  { id: "finalGift", label: "Final Gift", icon: "🎁" },
];

// ── Mini components ────────────────────────────────────────────────────
function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder = "",
  hint = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  hint?: string;
}) {
  const base =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-purple-100 placeholder-purple-400/40 focus:outline-none focus:border-purple-400/40 transition-colors font-body resize-none";
  return (
    <div className="mb-5">
      <label className="block text-xs text-purple-400/70 mb-1.5 font-body font-medium tracking-wide uppercase">
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={3}
          className={base}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          className={base}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
      {hint && <p className="text-xs text-purple-400/40 mt-1">{hint}</p>}
    </div>
  );
}

function Toggle({
  label,
  value,
  onChange,
  hint = "",
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  hint?: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <button
        onClick={() => onChange(!value)}
        className="mt-0.5 relative w-10 h-5 rounded-full transition-all flex-shrink-0 cursor-pointer"
        style={{
          background: value ? "rgba(167,139,250,0.7)" : "rgba(255,255,255,0.08)",
          border: "1px solid rgba(167,139,250,0.3)",
        }}
      >
        <motion.span
          layout
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
          animate={{ left: value ? "calc(100% - 1.1rem)" : "2px" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      </button>
      <div>
        <p className="text-sm text-purple-100 font-body">{label}</p>
        {hint && <p className="text-xs text-purple-400/40 mt-0.5">{hint}</p>}
      </div>
    </div>
  );
}

function SectionHeader({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="mb-8 pb-6 border-b border-white/5">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <h2 className="font-display text-xl text-white">{title}</h2>
      </div>
      <p className="text-sm text-purple-300/50 font-body">{desc}</p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────
export default function AdminPanel({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState<Section>("general");
  const [cfg, setCfg] = useState(() => JSON.parse(JSON.stringify(birthdayConfig)));
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const [previewTrack, setPreviewTrack] = useState<string>(cfg.music.track);

  // ── Derived setters ──
  const set = (path: string[], value: unknown) => {
    setCfg((prev: typeof birthdayConfig) => {
      const next = JSON.parse(JSON.stringify(prev));
      let obj: Record<string, unknown> = next;
      for (let i = 0; i < path.length - 1; i++) {
        obj = obj[path[i]] as Record<string, unknown>;
      }
      obj[path[path.length - 1]] = value;
      return next;
    });
  };

  // ── Memory helpers ──
  const updateMemory = (idx: number, key: string, val: string) => {
    const memories = [...cfg.memories];
    memories[idx] = { ...memories[idx], [key]: val };
    setCfg((p: typeof birthdayConfig) => ({ ...p, memories }));
  };
  const addMemory = () => {
    const memories = [
      ...cfg.memories,
      {
        id: String(cfg.memories.length + 1).padStart(2, "0"),
        title: "New Memory",
        emoji: "✨",
        story: "Write your memory here…",
        color: "from-violet-900/60 to-purple-900/40",
      },
    ];
    setCfg((p: typeof birthdayConfig) => ({ ...p, memories }));
  };
  const removeMemory = (idx: number) => {
    const memories = cfg.memories.filter((_: unknown, i: number) => i !== idx);
    setCfg((p: typeof birthdayConfig) => ({ ...p, memories }));
  };

  // ── Wish helpers ──
  const updateWish = (idx: number, key: string, val: string) => {
    const wishes = [...cfg.wishes];
    wishes[idx] = { ...wishes[idx], [key]: val };
    setCfg((p: typeof birthdayConfig) => ({ ...p, wishes }));
  };
  const addWish = () => {
    const wishes = [
      ...cfg.wishes,
      { icon: "🌟", title: "New Wish", text: "Write your wish here…" },
    ];
    setCfg((p: typeof birthdayConfig) => ({ ...p, wishes }));
  };
  const removeWish = (idx: number) => {
    const wishes = cfg.wishes.filter((_: unknown, i: number) => i !== idx);
    setCfg((p: typeof birthdayConfig) => ({ ...p, wishes }));
  };

  // ── Letter helpers ──
  const updateLine = (idx: number, val: string) => {
    const lines = [...cfg.letter.lines];
    lines[idx] = val;
    set(["letter", "lines"], lines);
  };
  const addLine = () => set(["letter", "lines"], [...cfg.letter.lines, "New line…"]);
  const removeLine = (idx: number) =>
    set(
      ["letter", "lines"],
      cfg.letter.lines.filter((_: unknown, i: number) => i !== idx)
    );

  // ── Music preview ──
  const playPreview = (trackKey: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setPreviewTrack(trackKey);
    const url =
      trackKey in MUSIC_TRACKS
        ? MUSIC_TRACKS[trackKey as keyof typeof MUSIC_TRACKS].url
        : trackKey;
    const audio = new Audio(url);
    audio.volume = 0.35;
    audio.play()
      .then(() => setPreviewPlaying(true))
      .catch(() => {});
    audioRef.current = audio;
    audio.addEventListener("ended", () => setPreviewPlaying(false));
  };
  const stopPreview = () => {
    audioRef.current?.pause();
    setPreviewPlaying(false);
  };
  useEffect(() => () => audioRef.current?.pause(), []);

  // ── Save / export ──
  const handleSave = () => {
    Object.assign(birthdayConfig, cfg);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopyConfig = () => {
    const code = `// Copy this into src/config/birthdayConfig.ts\nexport const birthdayConfig = ${JSON.stringify(cfg, null, 2)};`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // ── Section renderers ──
  const renderSection = () => {
    switch (activeSection) {
      case "general":
        return (
          <div>
            <SectionHeader icon="⚙️" title="General Settings" desc="Basic info about the birthday person." />
            <Field label="Name" value={cfg.name} onChange={(v) => set(["name"], v)} hint="This name appears throughout the site." />
            <Field label="Age (optional)" value={cfg.age} onChange={(v) => set(["age"], v)} hint='Leave empty "" to hide the age.' />
          </div>
        );

      case "music":
        return (
          <div>
            <SectionHeader icon="🎵" title="Music Settings" desc="Choose and configure the background music." />
            <Toggle
              label="Enable music player"
              value={cfg.music.enabled}
              onChange={(v) => set(["music", "enabled"], v)}
            />
            <Toggle
              label="Autoplay on load"
              value={cfg.music.autoplay}
              onChange={(v) => set(["music", "autoplay"], v)}
              hint="Note: Browsers often block autoplay. A manual play button is always shown."
            />
            <div className="mb-5">
              <label className="block text-xs text-purple-400/70 mb-1.5 font-body font-medium tracking-wide uppercase">
                Volume ({Math.round(cfg.music.volume * 100)}%)
              </label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={cfg.music.volume}
                onChange={(e) => set(["music", "volume"], parseFloat(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="mb-6">
              <label className="block text-xs text-purple-400/70 mb-3 font-body font-medium tracking-wide uppercase">
                Choose Track
              </label>
              <div className="grid gap-3">
                {Object.entries(MUSIC_TRACKS).map(([key, track]) => (
                  <div
                    key={key}
                    onClick={() => set(["music", "track"], key as MusicTrack)}
                    className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all"
                    style={{
                      background:
                        cfg.music.track === key
                          ? "rgba(167,139,250,0.15)"
                          : "rgba(255,255,255,0.03)",
                      border:
                        cfg.music.track === key
                          ? "1px solid rgba(167,139,250,0.4)"
                          : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex-1">
                      <p className="text-sm text-white font-body font-medium">{track.label}</p>
                      <p className="text-xs text-purple-400/50 mt-0.5">{track.description}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (previewPlaying && previewTrack === key) {
                          stopPreview();
                        } else {
                          playPreview(key);
                        }
                      }}
                      className="text-xs px-3 py-1.5 rounded-lg cursor-pointer transition-all"
                      style={{
                        background: "rgba(167,139,250,0.1)",
                        border: "1px solid rgba(167,139,250,0.2)",
                        color: "rgba(196,160,255,0.9)",
                      }}
                    >
                      {previewPlaying && previewTrack === key ? "⏹ Stop" : "▶ Preview"}
                    </button>
                    {cfg.music.track === key && (
                      <span className="text-purple-400 text-sm">✓</span>
                    )}
                  </div>
                ))}

                {/* Custom URL */}
                <div
                  className="p-4 rounded-xl"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="text-xs text-purple-400/60 mb-2 font-body">Custom MP3/OGG URL</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="https://example.com/music.mp3"
                      value={
                        cfg.music.track in MUSIC_TRACKS ? "" : cfg.music.track
                      }
                      onChange={(e) => set(["music", "track"], e.target.value as MusicTrack)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-purple-100 placeholder-purple-400/30 focus:outline-none focus:border-purple-400/40 font-body"
                    />
                    <button
                      onClick={() => {
                        if (cfg.music.track in MUSIC_TRACKS) return;
                        playPreview(cfg.music.track);
                      }}
                      className="text-xs px-3 py-2 rounded-lg cursor-pointer"
                      style={{
                        background: "rgba(167,139,250,0.1)",
                        border: "1px solid rgba(167,139,250,0.2)",
                        color: "rgba(196,160,255,0.9)",
                      }}
                    >
                      ▶ Test
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "intro":
        return (
          <div>
            <SectionHeader icon="✨" title="Opening Screen" desc="The first thing visitors see." />
            <Field label="Line 1" value={cfg.intro.line1} onChange={(v) => set(["intro", "line1"], v)} />
            <Field label="Line 2" value={cfg.intro.line2} onChange={(v) => set(["intro", "line2"], v)} />
            <Field label="Button Text" value={cfg.intro.buttonText} onChange={(v) => set(["intro", "buttonText"], v)} />
          </div>
        );

      case "nameReveal":
        return (
          <div>
            <SectionHeader icon="🌷" title="Name Reveal" desc="The animated name reveal screen." />
            <Field label="Line 1" value={cfg.nameReveal.line1} onChange={(v) => set(["nameReveal", "line1"], v)} />
            <Field label="Line 2" value={cfg.nameReveal.line2} onChange={(v) => set(["nameReveal", "line2"], v)} />
            <Field label="Greeting (before name)" value={cfg.nameReveal.greeting} onChange={(v) => set(["nameReveal", "greeting"], v)} />
            <Field label="Emoji (after name)" value={cfg.nameReveal.emoji} onChange={(v) => set(["nameReveal", "emoji"], v)} />
          </div>
        );

      case "memories":
        return (
          <div>
            <SectionHeader icon="📁" title="Memory Archive" desc="Cards that reveal personal stories/memories." />
            {cfg.memories.map((m: typeof birthdayConfig.memories[0], i: number) => (
              <div
                key={i}
                className="mb-6 p-5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-purple-400/60 text-xs font-body font-medium tracking-widest">
                    MEMORY {m.id}
                  </span>
                  <button
                    onClick={() => removeMemory(i)}
                    className="text-xs text-rose-400/60 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    ✕ Remove
                  </button>
                </div>
                <Field label="ID" value={m.id} onChange={(v) => updateMemory(i, "id", v)} />
                <Field label="Emoji" value={m.emoji} onChange={(v) => updateMemory(i, "emoji", v)} />
                <Field label="Title" value={m.title} onChange={(v) => updateMemory(i, "title", v)} />
                <Field label="Story" value={m.story} onChange={(v) => updateMemory(i, "story", v)} multiline />
              </div>
            ))}
            <button
              onClick={addMemory}
              className="w-full py-3 rounded-xl text-sm text-purple-300/70 cursor-pointer transition-all hover:text-purple-200"
              style={{ border: "1px dashed rgba(167,139,250,0.25)" }}
            >
              + Add Memory
            </button>
          </div>
        );

      case "letter":
        return (
          <div>
            <SectionHeader icon="💌" title="Birthday Letter" desc="Line-by-line letter revealed as user scrolls." />
            <Field label="Salutation" value={cfg.letter.salutation} onChange={(v) => set(["letter", "salutation"], v)} />
            <div className="mb-5">
              <label className="block text-xs text-purple-400/70 mb-3 font-body font-medium tracking-wide uppercase">
                Letter Lines
              </label>
              <div className="flex flex-col gap-3">
                {cfg.letter.lines.map((line: string, i: number) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="text-purple-400/40 text-xs mt-3 min-w-[20px] font-body">{i + 1}.</span>
                    <input
                      type="text"
                      value={line}
                      onChange={(e) => updateLine(i, e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-purple-100 focus:outline-none focus:border-purple-400/40 font-body"
                    />
                    <button
                      onClick={() => removeLine(i)}
                      className="text-rose-400/50 hover:text-rose-400 mt-2.5 text-sm cursor-pointer transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addLine}
                className="mt-3 w-full py-2.5 rounded-xl text-sm text-purple-300/60 cursor-pointer transition-all hover:text-purple-200"
                style={{ border: "1px dashed rgba(167,139,250,0.2)" }}
              >
                + Add Line
              </button>
            </div>
            <Field label="Sign-off" value={cfg.letter.sign} onChange={(v) => set(["letter", "sign"], v)} />
          </div>
        );

      case "wishes":
        return (
          <div>
            <SectionHeader icon="🌟" title="Wishes Cards" desc="Animated cards with birthday wishes." />
            {cfg.wishes.map((w: typeof birthdayConfig.wishes[0], i: number) => (
              <div
                key={i}
                className="mb-4 p-5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-purple-400/60 text-xs font-body tracking-widest font-medium">WISH {i + 1}</span>
                  <button onClick={() => removeWish(i)} className="text-xs text-rose-400/60 hover:text-rose-400 transition-colors cursor-pointer">
                    ✕ Remove
                  </button>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-3">
                  <Field label="Emoji" value={w.icon} onChange={(v) => updateWish(i, "icon", v)} />
                  <Field label="Title" value={w.title} onChange={(v) => updateWish(i, "title", v)} />
                </div>
                <Field label="Message" value={w.text} onChange={(v) => updateWish(i, "text", v)} multiline />
              </div>
            ))}
            <button
              onClick={addWish}
              className="w-full py-3 rounded-xl text-sm text-purple-300/70 cursor-pointer transition-all hover:text-purple-200"
              style={{ border: "1px dashed rgba(167,139,250,0.25)" }}
            >
              + Add Wish
            </button>
          </div>
        );

      case "miniGame":
        return (
          <div>
            <SectionHeader icon="🎮" title="Mini Game" desc="The star-collecting mini game settings." />
            <Field label="Stars to Collect" value={String(cfg.miniGame.starsToCollect)} onChange={(v) => set(["miniGame", "starsToCollect"], parseInt(v) || 5)} hint="Recommended: 3–8" />
            <Field label="Game Title" value={cfg.miniGame.title} onChange={(v) => set(["miniGame", "title"], v)} />
            <Field label="Subtitle" value={cfg.miniGame.subtitle} onChange={(v) => set(["miniGame", "subtitle"], v)} />
            <Field label="Reveal Message" value={cfg.miniGame.revealMessage} onChange={(v) => set(["miniGame", "revealMessage"], v)} />
            <Field label="Secret Text (shown after collecting all stars)" value={cfg.miniGame.secretText} onChange={(v) => set(["miniGame", "secretText"], v)} multiline />
          </div>
        );

      case "finalGift":
        return (
          <div>
            <SectionHeader icon="🎁" title="Final Gift" desc="The grand finale — the gift reveal." />
            <Field label="Button Text" value={cfg.finalGift.buttonText} onChange={(v) => set(["finalGift", "buttonText"], v)} />
            <Field label="Final Heading" value={cfg.finalGift.finalHeading} onChange={(v) => set(["finalGift", "finalHeading"], v)} />
            <Field label="Final Message" value={cfg.finalGift.finalMessage} onChange={(v) => set(["finalGift", "finalMessage"], v)} multiline />
            <Field label="Sign-off" value={cfg.finalGift.sign} onChange={(v) => set(["finalGift", "sign"], v)} />
            <Field label="Emoji" value={cfg.finalGift.emoji} onChange={(v) => set(["finalGift", "emoji"], v)} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative" style={{ background: "#0a0812" }}>
      <StarField />

      <div className="relative z-10 min-h-screen flex">
        {/* ── Sidebar ── */}
        <div
          className={`fixed inset-y-0 left-0 z-50 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            width: 240,
            background: "rgba(10,8,20,0.95)",
            borderRight: "1px solid rgba(167,139,250,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Logo */}
          <div className="p-5 border-b" style={{ borderColor: "rgba(167,139,250,0.08)" }}>
            <p className="font-script text-2xl text-purple-300 leading-none mb-1">Config Panel</p>
            <p className="font-body text-xs text-purple-400/50">Birthday Universe ✨</p>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto p-3">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-left cursor-pointer transition-all"
                style={{
                  background:
                    activeSection === item.id
                      ? "rgba(167,139,250,0.15)"
                      : "transparent",
                  border:
                    activeSection === item.id
                      ? "1px solid rgba(167,139,250,0.25)"
                      : "1px solid transparent",
                  color: activeSection === item.id ? "#c4a0ff" : "rgba(196,160,255,0.5)",
                }}
              >
                <span className="text-base">{item.icon}</span>
                <span className="font-body text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Back to site */}
          <div className="p-4 border-t" style={{ borderColor: "rgba(167,139,250,0.08)" }}>
            <button
              onClick={onBack}
              className="w-full py-2.5 rounded-xl text-sm font-body text-purple-300/70 hover:text-purple-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
              style={{ border: "1px solid rgba(167,139,250,0.15)" }}
            >
              ← Back to Site
            </button>
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Main content ── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-6 py-4 sticky top-0 z-30"
            style={{
              background: "rgba(10,8,20,0.85)",
              borderBottom: "1px solid rgba(167,139,250,0.08)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="flex items-center gap-3">
              {/* Hamburger (mobile) */}
              <button
                className="lg:hidden text-purple-400 cursor-pointer"
                onClick={() => setSidebarOpen(true)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
              <h1 className="font-display text-lg text-white">
                {NAV.find((n) => n.id === activeSection)?.icon}{" "}
                {NAV.find((n) => n.id === activeSection)?.label}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCopyConfig}
                className="px-3 py-2 rounded-lg text-xs font-body cursor-pointer transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(167,139,250,0.15)",
                  color: "rgba(196,160,255,0.7)",
                }}
              >
                {copied ? "✓ Copied!" : "Copy Config"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                className="px-4 py-2 rounded-lg text-xs font-body font-medium cursor-pointer transition-all"
                style={{
                  background: saved
                    ? "rgba(134,239,172,0.15)"
                    : "rgba(167,139,250,0.2)",
                  border: saved
                    ? "1px solid rgba(134,239,172,0.3)"
                    : "1px solid rgba(167,139,250,0.4)",
                  color: saved ? "#86efac" : "#c4a0ff",
                }}
              >
                {saved ? "✓ Saved!" : "Apply Changes"}
              </motion.button>
            </div>
          </div>

          {/* Section content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10">
            <div className="max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {renderSection()}
                </motion.div>
              </AnimatePresence>

              {/* Info box */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-10 p-5 rounded-2xl"
                style={{
                  background: "rgba(167,139,250,0.05)",
                  border: "1px solid rgba(167,139,250,0.1)",
                }}
              >
                <p className="text-xs text-purple-400/60 font-body leading-relaxed">
                  <span className="text-purple-300/70 font-medium">📝 How to make changes permanent:</span>
                  <br />
                  1. Edit the fields above and click <strong>Apply Changes</strong> to preview in the current session.
                  <br />
                  2. Click <strong>Copy Config</strong> to copy the full config code, then paste it into{" "}
                  <code className="bg-purple-900/30 px-1 rounded text-purple-300/70">src/config/birthdayConfig.ts</code>
                  <br />
                  3. Rebuild the site to make it permanent.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
