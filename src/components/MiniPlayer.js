import React from 'react';
import styles from './MiniPlayer.module.css';
import useFavorites from '../hooks/useFavorites';

const FALLBACK = 'https://via.placeholder.com/46x46/020617/38bdf8?text=%E2%99%AA';

function MiniPlayer({ song, isPlaying, progress, onToggle, onPrev, onNext, onSeek }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!song) return null;

  const fav = isFavorite(song.id);

  return (
    <div className={styles.bar}>
      {/* Progress line */}
      <div className={styles.progressContainer}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${(progress || 0) * 100}%` }} />
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={progress || 0}
          className={styles.progressInput}
          onChange={(e) => onSeek && onSeek(parseFloat(e.target.value))}
        />
      </div>

      <img
        src={song.cover}
        alt={song.title}
        className={styles.thumb}
        onError={(e) => { e.target.src = FALLBACK; }}
      />

      <div className={styles.info}>
        <div className={styles.songTitle}>{song.title}</div>
        <div className={styles.artist}>{song.artist}</div>
      </div>

      <button 
        className={styles.miniFavBtn}
        onClick={() => toggleFavorite(song.id)}
        title={fav ? "Remove from Favorites" : "Add to Favorites"}
      >
        {fav ? '❤️' : '🤍'}
      </button>

      <div className={styles.controls}>
        <button className={styles.btn} onClick={onPrev} title="Previous">⏮</button>
        <button
          className={`${styles.btn} ${isPlaying ? styles.playing : ''}`}
          onClick={onToggle}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className={styles.btn} onClick={onNext} title="Next">⏭</button>
      </div>
    </div>
  );
}

export default MiniPlayer;
