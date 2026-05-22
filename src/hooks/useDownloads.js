import { useState, useEffect } from 'react';
import { saveAudioBlob, deleteAudioBlob, getAllDownloadedIds } from '../utils/indexedDB';

function useDownloads() {
  const [downloadedIds, setDownloadedIds] = useState([]);
  const [downloadingIds, setDownloadingIds] = useState([]);

  const loadDownloads = () => {
    getAllDownloadedIds().then(setDownloadedIds).catch(console.error);
  };

  useEffect(() => {
    loadDownloads();
    const handleUpdate = () => loadDownloads();
    window.addEventListener('downloads_updated', handleUpdate);
    return () => window.removeEventListener('downloads_updated', handleUpdate);
  }, []);

  const downloadSong = async (song) => {
    if (downloadedIds.includes(song.id) || downloadingIds.includes(song.id)) return;

    setDownloadingIds((prev) => [...prev, song.id]);

    try {
      const response = await fetch(song.src);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      await saveAudioBlob(song.id, blob);
      window.dispatchEvent(new Event('downloads_updated'));
    } catch (error) {
      console.error('Failed to download song:', error);
      alert(`Failed to download ${song.title}`);
    } finally {
      setDownloadingIds((prev) => prev.filter((id) => id !== song.id));
    }
  };

  const removeDownload = async (songId) => {
    try {
      await deleteAudioBlob(songId);
      window.dispatchEvent(new Event('downloads_updated'));
    } catch (error) {
      console.error('Failed to remove download:', error);
    }
  };

  const isDownloaded = (songId) => downloadedIds.includes(songId);
  const isDownloading = (songId) => downloadingIds.includes(songId);

  return { downloadedIds, isDownloaded, isDownloading, downloadSong, removeDownload };
}

export default useDownloads;
