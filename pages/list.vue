<script setup lang="ts">
import { fetchAllPokemon } from "@/queries/pokemon";
import type { Pokemon } from "@/types/pokemon";
import TypeIcon from "@/components/atoms/TypeIcon.vue";
import { NuxtErrorBoundary } from "../.nuxt/components";
import { useFavorites } from "@/composables/useFavorites";

definePageMeta({
  layout: "base-layout",
});

const pokemonList = ref<Pokemon[]>([]);
const selectedTypes = ref<string[]>([]);
const isLoading = ref(true);
const searchQuery = ref("");
const showDialog = ref(false);
const selectedPokemon = ref<Pokemon | null>(null);
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

const loadPokemonList = async () => {
  try {
    isLoading.value = true;
    const response = await fetchAllPokemon();
    pokemonList.value = response;
  } catch (error) {
    console.error("Failed to load Pokemon:", error);
  } finally {
    isLoading.value = false;
  }
};

const filteredPokemonList = computed(() => {
  let filtered = pokemonList.value;

  if (selectedTypes.value.length > 0) {
    filtered = filtered.filter((pokemon) =>
      pokemon.types.some((type) => selectedTypes.value.includes(type))
    );
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query)
    );
  }

  return filtered;
});

const openDialog = (pokemon: Pokemon) => {
  selectedPokemon.value = pokemon;
  showDialog.value = true;
};

onMounted(() => {
  loadPokemonList();
});
</script>

<template #default>
  <v-container class="pt-4 px-4 pb-0 list-page">
    <!-- Filter Section -->
    <v-row class="mb-0" dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchQuery"
          prepend-icon="mdi-magnify"
          label="Search Pokémon"
          clearable
          hide-details
          class="rounded-lg"
          aria-label="Search Pokémon by name"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="selectedTypes"
          clearable
          :items="Object.keys(typeColors)"
          label="Filter by Type"
          multiple
          chips
          class="rounded-lg"
          aria-label="Filter Pokémon by type"
        >
          <template v-slot:selection="{ item }">
            <v-chip
              class="ma-1"
              :color="typeColors[item.value]"
              text-color="white"
              variant="elevated"
            >
              <TypeIcon
                :type="item.value.toLowerCase()"
                size="20px"
                class="mr-2"
              />
              {{ item.value }}
            </v-chip>
          </template>
          <template v-slot:item="{ item, props }">
            <v-list-item v-bind="props" :title="item.value">
              <template v-slot:prepend>
                <TypeIcon
                  :type="item.value.toLowerCase()"
                  size="24px"
                  class="mr-2"
                />
              </template>
            </v-list-item>
          </template>
        </v-select>
      </v-col>
    </v-row>

    <!-- Loading State -->
    <v-row v-if="isLoading" justify="center" align="center">
      <v-progress-circular indeterminate color="primary" size="64" />
    </v-row>

    <!-- No Results Message -->
    <v-row v-else-if="filteredPokemonList.length === 0" justify="center">
      <v-col cols="12" class="text-center">
        <v-icon icon="mdi-pokeball" size="64" />
        <h2 class="text-h5">No Pokémon Found</h2>
        <p class="text-body-1">Try adjusting your search or filters</p>
      </v-col>
    </v-row>

    <!-- Pokemon Grid -->
    <v-row v-else class="justify-start align-start">
      <v-col
        v-for="pokemon in filteredPokemonList"
        :key="pokemon.name"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="d-flex"
      >
        <v-card
          width="300"
          height="360"
          class="d-flex flex-column pokemon-card"
          :elevation="2"
          hover
          rounded="lg"
          role="article"
          :aria-label="pokemon.name"
          @click="openDialog(pokemon)"
        >
          <div class="pokemon-image-container position-relative">
            <v-btn
              icon
              size="small"
              color="amber"
              variant="flat"
              class="favorite-button"
              :aria-label="
                isFavorite(pokemon.name)
                  ? 'Remove from favorites'
                  : 'Add to favorites'
              "
              @click.stop="toggleFavorite(pokemon.name)"
            >
              <v-icon
                :icon="
                  isFavorite(pokemon.name) ? 'mdi-star' : 'mdi-star-outline'
                "
              />
            </v-btn>
            <v-img
              :src="pokemon.image"
              :aspect-ratio="1"
              contain
              :alt="pokemon.name"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate />
                </v-row>
              </template>
            </v-img>
          </div>

          <v-card-title class="text-h6 font-weight-medium pt-4 pb-2">
            {{ pokemon.name }}
          </v-card-title>

          <v-card-text class="pb-4">
            <v-row class="justify-start ma-0">
              <v-chip
                v-for="(type, index) in pokemon.types"
                :key="index"
                :color="typeColors[type]"
                text-color="white"
                class="mr-2 mb-2"
                size="small"
              >
                <TypeIcon :type="type.toLowerCase()" size="20px" class="mr-1" />
                {{ type }}
              </v-chip>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Detail Dialog -->
    <v-dialog
      v-model="showDialog"
      max-width="600"
      :scrim="true"
      transition="dialog-bottom-transition"
    >
      <v-card v-if="selectedPokemon" class="detail-dialog">
        <v-card-title class="text-h5 font-weight-bold pa-4">
          {{ selectedPokemon.name }}
          <div class="dialog-buttons">
            <v-btn
              icon
              size="small"
              color="amber"
              variant="flat"
              class="mr-2"
              :aria-label="
                isFavorite(selectedPokemon.name)
                  ? 'Remove from favorites'
                  : 'Add to favorites'
              "
              @click="toggleFavorite(selectedPokemon.name)"
            >
              <v-icon
                :icon="
                  isFavorite(selectedPokemon.name)
                    ? 'mdi-star'
                    : 'mdi-star-outline'
                "
              />
            </v-btn>
            <v-btn
              icon="mdi-close"
              size="small"
              variant="text"
              @click="showDialog = false"
              aria-label="Close dialog"
            />
          </div>
        </v-card-title>

        <div class="dialog-image-container">
          <v-img
            :src="selectedPokemon.image"
            height="400"
            contain
            :alt="selectedPokemon.name"
          />
        </div>

        <v-card-text class="pa-4">
          <v-row class="justify-start">
            <v-chip
              v-for="(type, index) in selectedPokemon.types"
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
  </v-container>
</template>

<style lang="scss">
.list-page {
  min-height: calc(100vh - 64px); // Adjust based on header height
  display: flex;
  flex-direction: column;
}

.pokemon-card {
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
}

.pokemon-image-container {
  padding: 1.5rem;
  background-color: white;
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  .favorite-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 1;
    background-color: white;
    opacity: 0.9;

    &:hover {
      opacity: 1;
    }
  }
}

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

.v-card-title {
  word-break: break-word;
  line-height: 1.4;
}

.v-chip {
  font-weight: 500;
}

// Improve focus visibility
.v-card:focus-visible,
.v-text-field:focus-visible,
.v-select:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

// Remove extra spacing from v-select's transition group
.v-select {
  :deep(.v-field__input) {
    padding-top: 0;
    padding-bottom: 0;
  }

  :deep(.v-field) {
    margin-bottom: 0;
  }

  :deep(.v-select__selection) {
    margin-top: 0;
    padding-top: 0;
  }

  :deep(.v-select__chips) {
    margin: 0;
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
