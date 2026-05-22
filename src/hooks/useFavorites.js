import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'soundhub-favorites';

function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      } else {
        setFavorites([]);
      }
    } catch (e) {
      console.error('Failed to load favorites', e);
    }
  };

  useEffect(() => {
    loadFavorites();
    const handleUpdate = () => loadFavorites();
    window.addEventListener('favorites_updated', handleUpdate);
    return () => window.removeEventListener('favorites_updated', handleUpdate);
  }, []);

  const toggleFavorite = (songId) => {
    setFavorites((prev) => {
      const isFav = prev.includes(songId);
      const newFavs = isFav ? prev.filter((id) => id !== songId) : [...prev, songId];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
        window.dispatchEvent(new Event('favorites_updated'));
      } catch (e) {
        console.error('Failed to save favorites', e);
      }
      return newFavs;
    });
  };

  const isFavorite = (songId) => favorites.includes(songId);

  return { favorites, toggleFavorite, isFavorite };
}

export default useFavorites;
