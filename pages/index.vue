<script setup lang="ts">
import { fetchPokemon } from "@/queries/pokemon";
import { getWikipediaApiUrl } from "@/config";
import TypeIcon from "@/components/atoms/TypeIcon.vue";
import type {
  Pokemon,
  WikipediaPage,
  WikipediaResponse,
} from "@/types/pokemon";

definePageMeta({
  layout: "base-layout",
});

const pokemonName = ref<string>("");
const pokemon = ref<Pokemon | null>(null);
const pokemonDescription = ref("");
const loading = ref(false);
const error = ref<string | null>(null);

function isWikipediaPage(obj: any): obj is WikipediaPage {
  return (
    obj &&
    typeof obj.pageid === "number" &&
    typeof obj.ns === "number" &&
    typeof obj.title === "string" &&
    typeof obj.extract === "string"
  );
}

const fetchPokemonDescription = async (name: string): Promise<string> => {
  try {
    const url = getWikipediaApiUrl(name);
    const response = await fetch(url);
    const data: WikipediaResponse = await response.json();
    const pages = data.query.pages;
    const page = Object.values(pages)[0];
    if (isWikipediaPage(page)) {
      if (page.extract) {
        error.value = null;
        return page.extract;
      } else {
        error.value = "Pokemon description not found.";
        return "";
      }
    } else {
      error.value = "Could not fetch information from Wikipedia.";
      return "";
    }
  } catch (err) {
    console.error("Error fetching Pokemon description:", err);
    error.value = "An error occurred while fetching data from Wikipedia.";
    return "";
  }
};

const fetchPokemonData = async () => {
  if (pokemonName.value) {
    try {
      loading.value = true;
      error.value = null;
      console.log("fetching pokemon data");
      const fetchedPokemon = await fetchPokemon(pokemonName.value);
      pokemon.value = fetchedPokemon;

      const description = await fetchPokemonDescription(pokemonName.value);
      pokemonDescription.value = description;
    } catch (err) {
      console.error("Error fetching Pokemon:", err);
      error.value = "Could not fetch Pokemon information.";
    } finally {
      loading.value = false;
    }
  }
};
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto pa-6" elevation="8">
          <div class="text-center mb-6">
            <h1 class="text-h4 font-weight-bold primary--text mb-2">
              Pokemon Search
            </h1>
            <p class="text-subtitle-1 text-medium-emphasis">
              Discover the world of Pokemon
            </p>
          </div>

          <v-form @submit.prevent="fetchPokemonData" class="mb-6">
            <v-text-field
              v-model="pokemonName"
              label="Enter Pokemon name"
              variant="outlined"
              :rules="[(v) => !!v || 'Name is required']"
              clearable
              @keyup.enter="fetchPokemonData"
            >
              <template v-slot:append>
                <v-btn
                  color="primary"
                  icon="mdi-magnify"
                  @click="fetchPokemonData"
                  :loading="loading"
                ></v-btn>
              </template>
            </v-text-field>
          </v-form>

          <v-alert v-if="error" type="error" variant="tonal" class="mb-4">
            {{ error }}
          </v-alert>

          <v-expand-transition>
            <div v-if="pokemon" class="pokemon-details">
              <v-divider class="mb-6"></v-divider>

              <div class="text-center mb-6">
                <h2 class="text-h5 text-capitalize mb-4">{{ pokemon.name }}</h2>
                <v-img
                  :src="pokemon.image"
                  alt="Pokemon image"
                  class="mx-auto mb-4 pokemon-image"
                  max-width="200"
                  contain
                ></v-img>

                <TypeIcon
                  v-for="type in pokemon.types"
                  :type="type"
                  size="20px"
                />
              </div>

              <v-expansion-panels variant="accordion">
                <v-expansion-panel>
                  <v-expansion-panel-title>Attacks</v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-list lines="two">
                      <v-list-item
                        v-for="(attack, index) in pokemon.attacks?.special"
                        :key="index"
                        :title="attack.name"
                        :subtitle="`Type: ${attack.type} | Damage: ${attack.damage}`"
                        prepend-icon="mdi-flash"
                      >
                        <template v-slot:prepend>
                          <TypeIcon
                            class="ma-4"
                            size="20px"
                            :type="attack.type"
                          />
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel v-if="pokemonDescription">
                  <v-expansion-panel-title>Description</v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <div
                      class="description-content"
                      v-html="pokemonDescription"
                    ></div>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.pokemon-details {
  animation: fadeIn 0.5s ease-out;
}

.pokemon-image {
  transition: transform 0.3s ease;
}

.pokemon-image:hover {
  transform: scale(1.1);
}

.description-content :deep(p) {
  margin-bottom: 1em;
}

.description-content :deep(i) {
  font-style: italic;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
