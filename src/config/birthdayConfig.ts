// ============================================================
//  🎂 BIRTHDAY UNIVERSE — MASTER CONFIG
//  Edit everything here to personalize the experience!
// ============================================================

export const birthdayConfig = {

  // ──────────────────────────────────────────────
  //  👤 PERSON
  // ──────────────────────────────────────────────
  name: "Aria",
  age: "24",            // leave empty "" to hide age

  // ──────────────────────────────────────────────
  //  🎵 MUSIC
  //  Options: "lofi", "piano", "cinematic", "acoustic", "ambient", "none"
  //  OR paste a direct URL to an mp3/ogg file
  // ──────────────────────────────────────────────
  music: {
    enabled: true,
    // Built-in themes: "lofi" | "piano" | "cinematic" | "acoustic" | "ambient"
    // Or set to a direct URL string for a custom track
    track: "lofi" as MusicTrack,
    autoplay: false,        // auto-start music when site loads
    volume: 0.4,            // 0.0 – 1.0
  },

  // ──────────────────────────────────────────────
  //  🌟 OPENING SCREEN
  // ──────────────────────────────────────────────
  intro: {
    line1: "I made something for you…",
    line2: "But you have to discover it.",
    buttonText: "Start the surprise ✨",
  },

  // ──────────────────────────────────────────────
  //  🎀 NAME REVEAL
  // ──────────────────────────────────────────────
  nameReveal: {
    line1: "Today isn't just another day…",
    line2: "Because someone pretty awesome was born today.",
    greeting: "Happy Birthday,",      // shown before the name
    emoji: "🌷",                     // shown after the name
  },

  // ──────────────────────────────────────────────
  //  📁 MEMORY ARCHIVE
  // ──────────────────────────────────────────────
  memories: [
    {
      id: "01",
      title: "The First Conversation",
      emoji: "💬",
      story: "Remember that first time we talked? Neither of us planned it, but somehow it felt like we'd known each other for years. It was the kind of conversation you don't forget.",
      color: "from-violet-900/60 to-purple-900/40",
    },
    {
      id: "02",
      title: "That Ridiculous Moment 😂",
      emoji: "🤣",
      story: "I don't even know how it happened, but we ended up laughing so hard we couldn't breathe. Even now, thinking about it makes me smile.",
      color: "from-pink-900/60 to-rose-900/40",
    },
    {
      id: "03",
      title: "The Inside Joke",
      emoji: "🤫",
      story: "You know the one. The kind nobody else would get but us. It still cracks me up every single time without fail.",
      color: "from-indigo-900/60 to-blue-900/40",
    },
    {
      id: "04",
      title: "A Memory I'll Always Keep",
      emoji: "✨",
      story: "There are moments in life that just stick with you — this one stuck. I don't think I'll ever stop being grateful for it.",
      color: "from-fuchsia-900/60 to-purple-900/40",
    },
    {
      id: "05",
      title: "And Many More…",
      emoji: "🌸",
      story: "This is just a highlight reel. The real archive is stored somewhere much safer — in the parts of memory that never fade.",
      color: "from-rose-900/60 to-pink-900/40",
    },
  ],

  // ──────────────────────────────────────────────
  //  💌 BIRTHDAY LETTER  (one line per array item)
  // ──────────────────────────────────────────────
  letter: {
    salutation: "Dear Aria,",
    lines: [
      "Some people come into your life quietly…",
      "and without making a big announcement,",
      "they start to matter.",
      "You're one of those people.",
      "You have this rare ability to make ordinary moments feel worth remembering.",
      "The way you laugh at the dumbest things.",
      "The way you care, even when you're tired.",
      "The way you show up — not perfectly, but genuinely.",
      "That's not a small thing. That's everything.",
      "I hope this birthday feels as special as you make things feel for others.",
      "You deserve a year full of wonderful surprises.",
      "Happy Birthday. 🌷",
    ],
    sign: "— Written with care, just for you",
  },

  // ──────────────────────────────────────────────
  //  🌷 WISHES CARDS
  // ──────────────────────────────────────────────
  wishes: [
    {
      icon: "🌟",
      title: "Happiness",
      text: "May you always have reasons to smile, even on the quiet days.",
    },
    {
      icon: "🚀",
      title: "Dreams",
      text: "May the things you dream about slowly, beautifully become real.",
    },
    {
      icon: "🌻",
      title: "Confidence",
      text: "May you always remember just how capable you truly are.",
    },
    {
      icon: "☁️",
      title: "Peace",
      text: "May life hand you plenty of calm and peaceful days to breathe.",
    },
    {
      icon: "✨",
      title: "Adventures",
      text: "May this year give you stories worth telling for years to come.",
    },
    {
      icon: "💛",
      title: "Love",
      text: "May you always be surrounded by people who truly see you.",
    },
    {
      icon: "🎯",
      title: "Purpose",
      text: "May every step you take this year feel like it means something.",
    },
  ],

  // ──────────────────────────────────────────────
  //  🎮 MINI GAME
  // ──────────────────────────────────────────────
  miniGame: {
    starsToCollect: 5,
    title: "Collect the Birthday Stars",
    subtitle: "Find all the hidden stars…",
    revealMessage: "You found the secret! 🎉",
    secretText: "Your actual present is… another year of being absolutely awesome. 😌",
  },

  // ──────────────────────────────────────────────
  //  🎁 FINAL GIFT
  // ──────────────────────────────────────────────
  finalGift: {
    buttonText: "One last thing…",
    finalHeading: "Happy Birthday,",
    finalMessage: "I hope this year becomes one of your best chapters yet. You deserve every beautiful thing coming your way.",
    sign: "Made with ❤️ + a lot of JavaScript",
    emoji: "💐",
  },

};

// ──────────────────────────────────────────────
//  🎵 MUSIC TRACK TYPE
// ──────────────────────────────────────────────
export type MusicTrack = "lofi" | "piano" | "cinematic" | "acoustic" | "ambient" | string;

// Built-in music track URLs (royalty-free public domain / CC0)
export const MUSIC_TRACKS: Record<string, { label: string; url: string; description: string }> = {
  lofi: {
    label: "Lo-Fi Chill 🎵",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
    description: "Soft lo-fi beats — relaxed and warm",
  },
  piano: {
    label: "Gentle Piano 🎹",
    url: "https://cdn.pixabay.com/download/audio/2024/02/28/audio_8e02534036.mp3",
    description: "Delicate solo piano — emotional and soft",
  },
  cinematic: {
    label: "Cinematic Dream 🎬",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1e18ead5e3.mp3",
    description: "Sweeping orchestral — big and beautiful",
  },
  acoustic: {
    label: "Acoustic Morning ☀️",
    url: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946b5db64e.mp3",
    description: "Warm acoustic guitar — cozy and bright",
  },
  ambient: {
    label: "Ambient Glow 🌌",
    url: "https://cdn.pixabay.com/download/audio/2023/06/15/audio_a5f29ba5b3.mp3",
    description: "Ethereal ambient pads — dreamy and calm",
  },
};
