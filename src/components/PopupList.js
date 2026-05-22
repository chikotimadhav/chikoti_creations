import React from 'react';
import SongCard from './SongCard';
import styles from './PopupList.module.css';

function PopupList({ title, songs, currentSongId, onClose, onPlay, onPause, onVolume }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <div className={styles.content}>
          {songs.length > 0 ? (
            <div className={styles.grid}>
              {songs.map(song => (
                <SongCard
                  key={song.id}
                  song={song}
                  isActive={currentSongId === song.id}
                  onPlay={() => onPlay(song.id)}
                  onPause={() => onPause(song.id)}
                  onVolume={(vol) => onVolume(song.id, vol)}
                />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              No songs here yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PopupList;
