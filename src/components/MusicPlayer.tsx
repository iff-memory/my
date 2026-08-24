import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig, MUSIC_TRACKS } from "../config/birthdayConfig";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(birthdayConfig.music.volume);
  const [showPanel, setShowPanel] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const getTrackUrl = () => {
    const t = birthdayConfig.music.track;
    if (t in MUSIC_TRACKS) return MUSIC_TRACKS[t as keyof typeof MUSIC_TRACKS].url;
    return t; // custom URL
  };

  const getTrackLabel = () => {
    const t = birthdayConfig.music.track;
    if (t in MUSIC_TRACKS) return MUSIC_TRACKS[t as keyof typeof MUSIC_TRACKS].label;
    return "Custom Track 🎵";
  };

  useEffect(() => {
    if (!birthdayConfig.music.enabled) return;
    const audio = new Audio();
    audio.src = getTrackUrl();
    audio.loop = true;
    audio.volume = volume;
    audio.crossOrigin = "anonymous";
    audio.addEventListener("canplaythrough", () => setLoaded(true));
    audio.addEventListener("error", () => setError(true));
    audio.load();
    audioRef.current = audio;

    if (birthdayConfig.music.autoplay) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => setError(true));
      setPlaying(true);
    }
  };

  if (!birthdayConfig.music.enabled) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[1000] flex flex-col items-end gap-2">
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass-strong rounded-2xl p-4 w-56 mb-1"
          >
            <p className="text-xs text-purple-300 font-body mb-1 font-medium">Now Playing</p>
            <p className="text-sm text-white font-display mb-3 leading-snug">{getTrackLabel()}</p>

            {error ? (
              <p className="text-xs text-rose-400">Could not load track.</p>
            ) : !loaded ? (
              <p className="text-xs text-purple-400 animate-pulse">Loading…</p>
            ) : null}

            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-purple-400">🔈</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 accent-purple-400 h-1 cursor-pointer"
              />
              <span className="text-xs text-purple-400">🔊</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 items-center">
        {/* Panel toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPanel((v) => !v)}
          className="glass w-9 h-9 rounded-full flex items-center justify-center text-purple-300 hover:text-white transition-colors"
          title="Music settings"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.07 4.93A10 10 0 0 1 20 12M12 2a10 10 0 0 1 7.07 2.93" />
            <path d="M4.93 19.07A10 10 0 0 1 4 12M12 22a10 10 0 0 1-7.07-2.93" />
          </svg>
        </motion.button>

        {/* Play/Pause */}
        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggle}
          className="glass w-12 h-12 rounded-full flex items-center justify-center transition-all"
          style={{
            background: playing
              ? "rgba(167,139,250,0.2)"
              : "rgba(255,255,255,0.05)",
            border: playing
              ? "1px solid rgba(167,139,250,0.4)"
              : "1px solid rgba(255,255,255,0.08)",
          }}
          title={playing ? "Pause music" : "Play music"}
        >
          {playing ? (
            <motion.div
              className="flex gap-0.5"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              <div className="w-1 h-4 bg-purple-300 rounded-full" />
              <div className="w-1 h-4 bg-purple-300 rounded-full" style={{ animationDelay: "0.2s" }} />
            </motion.div>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(196,160,255,0.9)">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </motion.button>
      </div>
    </div>
  );
}
