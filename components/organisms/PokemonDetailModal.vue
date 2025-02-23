<script setup lang="ts">
import { usePokemonStore } from "@/stores/pokemon";
import TypeIcon from "@/components/atoms/TypeIcon.vue";
import { useFavorites } from "@/composables/useFavorites";

const pokemonStore = usePokemonStore();
const { isFavorite, toggleFavorite } = useFavorites();

const typeColors: Record<string, string> = {
  Normal: "grey",
  Fire: "red",
  Water: "blue",
  Electric: "yellow",
  Grass: "green",
  Ice: "cyan",
  Fighting: "brown",
  Poison: "purple",
  Ground: "sienna",
  Flying: "skyblue",
  Psychic: "pink",
  Bug: "lime",
  Rock: "darkgrey",
  Ghost: "indigo",
  Dark: "black",
  Dragon: "orange",
  Steel: "silver",
  Fairy: "magenta",
};
</script>

<template>
  <v-dialog
    v-model="pokemonStore.isModalOpen"
    max-width="600"
    :scrim="true"
    transition="dialog-bottom-transition"
  >
    <v-card v-if="pokemonStore.currentPokemon" class="detail-dialog">
      <v-card-title class="text-h5 font-weight-bold pa-4">
        {{ pokemonStore.currentPokemon.name }}
        <div class="dialog-buttons">
          <v-btn
            icon
            size="small"
            color="amber"
            variant="flat"
            class="mr-2"
            :aria-label="
              isFavorite(pokemonStore.currentPokemon.name)
                ? 'Remove from favorites'
                : 'Add to favorites'
            "
            @click="toggleFavorite(pokemonStore.currentPokemon.name)"
          >
            <v-icon
              :icon="
                isFavorite(pokemonStore.currentPokemon.name)
                  ? 'mdi-star'
                  : 'mdi-star-outline'
              "
            />
          </v-btn>
          <v-btn
            icon="mdi-close"
            size="small"
            variant="text"
            @click="pokemonStore.closeModal()"
            aria-label="Close dialog"
          />
        </div>
      </v-card-title>

      <div class="dialog-image-container">
        <v-img
          :src="pokemonStore.currentPokemon.image"
          height="400"
          contain
          :alt="pokemonStore.currentPokemon.name"
        />
      </div>

      <v-card-text class="pa-4">
        <v-row class="justify-start">
          <v-chip
            v-for="(type, index) in pokemonStore.currentPokemon.types"
            :key="index"
            :color="typeColors[type]"
            text-color="white"
            class="mr-2 mb-2"
            size="large"
          >
            <TypeIcon :type="type.toLowerCase()" size="24px" class="mr-2" />
            {{ type }}
          </v-chip>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.detail-dialog {
  .v-card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dialog-image-container {
    background-color: white;
    padding: 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
}

// Dialog animation
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.3s ease-in-out;
}

.dialog-bottom-transition-enter-from,
.dialog-bottom-transition-leave-to {
  transform: translateY(100%);
}
</style>
