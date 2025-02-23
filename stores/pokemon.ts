import { defineStore } from "pinia";
import type { Pokemon } from "~/types/pokemon";

export const usePokemonStore = defineStore("pokemon", () => {
  // State
  const selectedPokemon = ref<Pokemon | null>(null);
  const isModalOpen = ref(false);

  // Getters
  const currentPokemon = computed(() => selectedPokemon.value);
  const modalVisible = computed(() => isModalOpen.value);

  // Actions
  const openModal = (pokemon: Pokemon) => {
    selectedPokemon.value = pokemon;
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    selectedPokemon.value = null;
  };

  return {
    // State
    selectedPokemon,
    isModalOpen,
    // Getters
    currentPokemon,
    modalVisible,
    // Actions
    openModal,
    closeModal,
  };
});
