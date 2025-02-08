import { ref, onMounted } from "vue";

export const useFavorites = () => {
  const favorites = ref<Set<string>>(new Set());

  const loadFavorites = () => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      favorites.value = new Set(JSON.parse(stored));
    }
  };

  const saveFavorites = () => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(Array.from(favorites.value))
    );
  };

  const toggleFavorite = (pokemonName: string) => {
    if (favorites.value.has(pokemonName)) {
      favorites.value.delete(pokemonName);
    } else {
      favorites.value.add(pokemonName);
    }
    saveFavorites();
  };

  const isFavorite = (pokemonName: string): boolean => {
    return favorites.value.has(pokemonName);
  };

  onMounted(() => {
    loadFavorites();
  });

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};
