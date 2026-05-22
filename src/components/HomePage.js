import React, { useState } from 'react';
import styles from './HomePage.module.css';
import PopupList from './PopupList';
import AddSongPopup from './AddSongPopup';

const FALLBACK = 'https://via.placeholder.com/160x160/0f172a/38bdf8?text=%E2%99%AA';

function HomePage({ playlists, favSongs, downSongs, currentSongId, onPlay, onPause, onVolume, onSelectPlaylist }) {
  const [activePopup, setActivePopup] = useState(null); // 'favorites' | 'downloads' | 'addSong' | null

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.logo}>Sound</h1>
          <p className={styles.tagline}>Your Music Universe</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.actionBtn} onClick={() => setActivePopup('favorites')}>
            ❤️ Favorites
          </button>
          <button className={styles.actionBtn} onClick={() => setActivePopup('downloads')}>
            ⬇️ Downloads
          </button>
          <button className={styles.actionBtn} onClick={() => setActivePopup('addSong')}>
            ➕ Add Song
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {playlists.map((pl) => (
          <button
            key={pl.id}
            className={styles.card}
            onClick={() => onSelectPlaylist(pl.id)}
          >
            <div className={styles.imgWrap}>
              <img
                src={pl.cover}
                alt={pl.name}
                onError={(e) => { e.target.src = FALLBACK; }}
              />
              <div className={styles.overlay}>
                <span className={styles.playIcon}>▶</span>
              </div>
            </div>
            <span className={styles.label}>{pl.emoji} {pl.name}</span>
          </button>
        ))}
      </div>

      {activePopup === 'favorites' && (
        <PopupList 
          title="❤️ Favorites"
          songs={favSongs}
          currentSongId={currentSongId}
          onClose={() => setActivePopup(null)}
          onPlay={onPlay}
          onPause={onPause}
          onVolume={onVolume}
        />
      )}

      {activePopup === 'downloads' && (
        <PopupList 
          title="⬇️ Downloads"
          songs={downSongs}
          currentSongId={currentSongId}
          onClose={() => setActivePopup(null)}
          onPlay={onPlay}
          onPause={onPause}
          onVolume={onVolume}
        />
      )}

      {activePopup === 'addSong' && (
        <AddSongPopup onClose={() => setActivePopup(null)} />
      )}
    </div>
  );
}

export default HomePage;
