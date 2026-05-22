import React, { useState, useMemo } from 'react';
import HomePage from './HomePage';
import PlaylistPage from './PlaylistPage';
import MiniPlayer from './MiniPlayer';
import useAudioPlayer from '../hooks/useAudioPlayer';
import useFavorites from '../hooks/useFavorites';
import useDownloads from '../hooks/useDownloads';
import playlists from '../data/playlists';
import styles from './Sound.module.css';

const allSongs = playlists.flatMap((pl) => pl.songs);
const songMap = Object.fromEntries(allSongs.map((s) => [s.id, s]));

function Sound() {
  const [view, setView] = useState('home'); // 'home' | playlist id

  const {
    currentSongId,
    currentSong,
    isPlaying,
    progress,
    handlePlay,
    handlePause,
    handleVolume,
    handleSeek,
    miniToggle,
    miniPrev,
    miniNext,
  } = useAudioPlayer();

  const { favorites } = useFavorites();
  const { downloadedIds } = useDownloads();

  const [refreshTick, setRefreshTick] = useState(0);

  // Hidden 30s refresh mechanism
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setRefreshTick(tick => tick + 1);
    }, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const activePlaylist = playlists.find((pl) => pl.id === view);

  const favSongs = React.useMemo(() => favorites.map(id => songMap[id]).filter(Boolean), [favorites, refreshTick]);
  const downSongs = React.useMemo(() => downloadedIds.map(id => songMap[id]).filter(Boolean), [downloadedIds, refreshTick]);

  return (
    <div className={styles.root}>
      {/* Google Fonts */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Exo+2:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      {view === 'home' ? (
        <HomePage 
          playlists={playlists} 
          favSongs={favSongs}
          downSongs={downSongs}
          currentSongId={currentSongId}
          onPlay={handlePlay}
          onPause={handlePause}
          onVolume={handleVolume}
          onSelectPlaylist={(id) => setView(id)} 
        />
      ) : (
        <PlaylistPage
          playlist={activePlaylist}
          currentSongId={currentSongId}
          onBack={() => setView('home')}
          onPlay={handlePlay}
          onPause={handlePause}
          onVolume={handleVolume}
        />
      )}

      <MiniPlayer
        song={currentSong}
        isPlaying={isPlaying}
        progress={progress}
        onToggle={miniToggle}
        onPrev={miniPrev}
        onNext={miniNext}
        onSeek={(ratio) => handleSeek(currentSongId, ratio)}
      />
    </div>
  );
}

export default Sound;
