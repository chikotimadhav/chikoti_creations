import React from 'react';
import styles from './SongCard.module.css';
import useFavorites from '../hooks/useFavorites';
import useDownloads from '../hooks/useDownloads';

const FALLBACK = 'https://via.placeholder.com/200x200/020617/38bdf8?text=%E2%99%AA';

function SongCard({ song, isActive, onPlay, onPause, onVolume }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isDownloaded, isDownloading, downloadSong, removeDownload } = useDownloads();

  const fav = isFavorite(song.id);
  const downloaded = isDownloaded(song.id);
  const downloading = isDownloading(song.id);

  return (
    <div className={`${styles.card} ${isActive ? styles.active : ''}`}>
      <div className={styles.imageWrapper}>
        <img
          src={song.cover}
          alt={song.title}
          className={styles.thumb}
          onError={(e) => { e.target.src = FALLBACK; }}
        />
        <button 
          className={`${styles.favBtn} ${fav ? styles.isFav : ''}`}
          onClick={() => toggleFavorite(song.id)}
          title={fav ? "Remove from Favorites" : "Add to Favorites"}
        >
          {fav ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className={styles.titleWrapper}>
        <div className={styles.titleInfo}>
          <div className={styles.title}>{song.title}</div>
          <div className={styles.artist}>{song.artist}</div>
        </div>
        <button 
          className={styles.downloadBtn}
          onClick={() => downloaded ? removeDownload(song.id) : downloadSong(song)}
          disabled={downloading}
          title={downloaded ? "Remove Download" : "Download for Offline"}
        >
          {downloading ? '⏳' : downloaded ? '✅' : '⬇️'}
        </button>
      </div>

      <div className={styles.controls}>
        <button className={styles.btnPlay} onClick={onPlay}>▶ Play</button>
        <button className={styles.btnPause} onClick={onPause}>⏸ Pause</button>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue="0.8"
        className={styles.volume}
        onChange={(e) => onVolume(parseFloat(e.target.value))}
      />
    </div>
  );
}

export default SongCard;
