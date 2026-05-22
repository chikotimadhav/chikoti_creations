import React, { useState } from 'react';
import SongCard from './SongCard';
import styles from './PlaylistPage.module.css';

function PlaylistPage({ playlist, currentSongId, onBack, onPlay, onPause, onVolume }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = playlist.songs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack}>← Back</button>
        <h1 className={styles.title}>{playlist.emoji} {playlist.name}</h1>
      </div>

      <div className={styles.searchContainer}>
        <input 
          type="text" 
          placeholder="Search for Telugu songs or artists..." 
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.songsGrid}>
        {playlist.songs.length === 0 ? (
          <div className={styles.noResults}>
            No songs here yet! <br/>
            Go explore and add some.
          </div>
        ) : filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              isActive={currentSongId === song.id}
              onPlay={() => onPlay(song.id)}
              onPause={() => onPause(song.id)}
              onVolume={(vol) => onVolume(song.id, vol)}
            />
          ))
        ) : (
          <div className={styles.noResults}>No songs found matching "{searchQuery}"</div>
        )}
      </div>
    </div>
  );
}

export default PlaylistPage;
