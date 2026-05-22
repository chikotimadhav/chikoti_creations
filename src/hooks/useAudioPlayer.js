import { useRef, useState, useEffect, useCallback } from 'react';
import playlists from '../data/playlists';
import { getAudioBlob } from '../utils/indexedDB';

// Flat list of all songs across all playlists
const allSongs = playlists.flatMap((pl) => pl.songs);
const songMap = Object.fromEntries(allSongs.map((s) => [s.id, s]));

function useAudioPlayer() {
  const audioRefs = useRef({});
  const blobUrls = useRef({});
  const [currentSongId, setCurrentSongId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentSong = currentSongId ? songMap[currentSongId] : null;

  // Get or create Audio instance (async to check indexedDB)
  const getAudio = useCallback(async (id) => {
    if (!audioRefs.current[id]) {
      const song = songMap[id];
      if (!song) return null;
      
      let src = song.src;
      try {
        const blob = await getAudioBlob(id);
        if (blob) {
          const url = URL.createObjectURL(blob);
          blobUrls.current[id] = url;
          src = url;
        }
      } catch (err) {
        console.error('Error fetching audio from IndexedDB', err);
      }
      
      const a = new Audio(src);
      a.volume = 0.8;
      audioRefs.current[id] = a;
    }
    return audioRefs.current[id];
  }, []);

  // Auto-next handler
  const handleAutoNext = useCallback((finishedId) => {
    const idx = allSongs.findIndex((s) => s.id === finishedId);
    const next = allSongs[idx + 1];
    if (next) {
      // Slight delay before auto-advancing
      setTimeout(() => handlePlay(next.id), 300);
    } else {
      setIsPlaying(false);
    }
  }, []);

  const handlePlay = useCallback(async (id) => {
    // Pause all others
    Object.entries(audioRefs.current).forEach(([k, a]) => {
      if (k !== id) {
        a.pause();
        a.currentTime = 0;
      }
    });

    const a = await getAudio(id);
    if (!a) return;

    // Attach listeners once
    if (!a._listenersAttached) {
      a.addEventListener('ended', () => handleAutoNext(id));
      a.addEventListener('timeupdate', () => {
        if (a.duration) setProgress(a.currentTime / a.duration);
      });
      a._listenersAttached = true;
    }

    a.play().catch(() => { });
    setCurrentSongId(id);
    setIsPlaying(true);
  }, [getAudio, handleAutoNext]);

  const handlePause = useCallback((id) => {
    const a = audioRefs.current[id];
    if (a) a.pause();
    if (currentSongId === id) setIsPlaying(false);
  }, [currentSongId]);

  const handleVolume = useCallback((id, vol) => {
    const a = audioRefs.current[id];
    if (a) a.volume = vol;
  }, []);

  const handleSeek = useCallback((id, ratio) => {
    const a = audioRefs.current[id];
    if (a && a.duration) {
      a.currentTime = a.duration * ratio;
      setProgress(ratio);
    }
  }, []);

  // Mini player prev/next
  const miniPrev = useCallback(() => {
    if (!currentSongId) return;
    const idx = allSongs.findIndex((s) => s.id === currentSongId);
    if (idx > 0) handlePlay(allSongs[idx - 1].id);
  }, [currentSongId, handlePlay]);

  const miniNext = useCallback(() => {
    if (!currentSongId) return;
    const idx = allSongs.findIndex((s) => s.id === currentSongId);
    if (idx < allSongs.length - 1) handlePlay(allSongs[idx + 1].id);
  }, [currentSongId, handlePlay]);

  const miniToggle = useCallback(() => {
    if (!currentSongId) return;
    if (isPlaying) handlePause(currentSongId);
    else handlePlay(currentSongId);
  }, [currentSongId, isPlaying, handlePlay, handlePause]);


  // Cleanup all audio and blob URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach((a) => a.pause());
      Object.values(blobUrls.current).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return {
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
  };
}

export default useAudioPlayer;
