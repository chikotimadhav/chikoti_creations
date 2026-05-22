# 🎵 SoundHub — React Music App

A fully functional React music player with 6 playlists and 36 songs.

---

## 📁 Project Structure

```
soundhub/
├── public/
│   └── index.html
├── src/
│   ├── index.js            ← React entry point
│   ├── index.css           ← Global styles & scrollbar
│   ├── App.js              ← Root App
│   ├── data/
│   │   └── playlists.js    ← All 6 playlists + 36 songs data
│   ├── hooks/
│   │   └── useAudioPlayer.js ← Custom hook (audio logic)
│   └── components/
│       ├── SoundHub.js         ← Main orchestrator
│       ├── SoundHub.module.css
│       ├── HomePage.js         ← Playlist grid
│       ├── HomePage.module.css
│       ├── PlaylistPage.js     ← Song list view
│       ├── PlaylistPage.module.css
│       ├── SongCard.js         ← Individual song card
│       ├── SongCard.module.css
│       ├── MiniPlayer.js       ← Fixed bottom player bar
│       └── MiniPlayer.module.css
├── package.json
└── README.md
```

---

## 🚀 How to Run

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm start
```

App opens at **http://localhost:3000**

### 3. Build for production
```bash
npm run build
```

---

## ✨ Features

- **6 Playlists** — Melody Magic, Mass Beats, Telangana Folk, Moonlight Melodies, Soulful Devotion, Political Pulse
- **36 Songs** total across all playlists
- **Auto-next** — plays the next song automatically when one ends
- **Mini Player Bar** — fixed at the bottom with ⏮ ▶/⏸ ⏭ controls and live progress bar
- **Per-song volume control** — each song card has its own volume slider
- **Tab visibility pause** — music pauses when you switch tabs
- **Responsive grid** — works on mobile and desktop
- **CSS Modules** — scoped styles, no conflicts

---

## 🛠 Tech Stack

- React 18
- CSS Modules
- HTML5 Audio API (no external audio libraries)
- Google Fonts (Rajdhani + Exo 2)
