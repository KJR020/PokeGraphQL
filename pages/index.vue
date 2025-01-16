<script setup lang="ts">
import { fetchPokemon } from '@/queries/pokemon';
import { getWikipediaApiUrl } from '@/config';
import type { Pokemon, WikipediaPage, WikipediaResponse } from '@/types/pokemon';

definePageMeta({
  layout: "base-layout",
});


const pokemonName = ref<string>('');
const pokemon = ref<Pokemon | null>(null);
const pokemonDescription = ref('');
const loading = ref(false);

function isWikipediaPage(obj: any): obj is WikipediaPage {
  return obj && typeof obj.pageid === 'number' && typeof obj.ns === 'number' && typeof obj.title === 'string' && typeof obj.extract === 'string';
}

const fetchPokemonDescription = async (name: string): Promise<string> => {
  try {
    const url = getWikipediaApiUrl(name);
    const response = await fetch(url);
    const data: WikipediaResponse = await response.json();
    const pages = data.query.pages;
    const page = Object.values(pages)[0];
    if (isWikipediaPage(page)) {
      return page.extract;
    } else {
      console.error('Invalid Wikipedia page format');
      return '';
    }
  } catch (error) {
    console.error('Error fetching Pokemon description:', error);
    return '';
  }
};


const fetchPokemonData = async () => {
  if (pokemonName.value) {
    try {
      loading.value = true;
      console.log('fetching pokemon data');
      const fetchedPokemon = await fetchPokemon(pokemonName.value);
      pokemon.value = fetchedPokemon;

      const description = await fetchPokemonDescription(pokemonName.value);
      pokemonDescription.value = description;
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    } finally {
      loading.value = false;
    }
  }
};

</script>

<template #default>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto pa-6" elevation="8">
          <div class="text-center mb-6">
            <h1 class="text-h4 font-weight-bold primary--text mb-2">Pokémon Search</h1>
            <p class="text-subtitle-1 text-medium-emphasis">Discover the world of Pokémon</p>
          </div>

          <v-form @submit.prevent="fetchPokemonData" class="mb-6">
            <v-text-field v-model="pokemonName" label="Enter Pokémon name" variant="outlined"
              :rules="[v => !!v || 'Name is required']" clearable @keyup.enter="fetchPokemonData">
              <template v-slot:append>
                <v-btn color="primary" icon="mdi-magnify" @click="fetchPokemonData" :loading="loading"></v-btn>
              </template>
            </v-text-field>
          </v-form>

          <v-expand-transition>
            <div v-if="pokemon" class="pokemon-details">
              <v-divider class="mb-6"></v-divider>

              <div class="text-center mb-6">
                <h2 class="text-h5 text-capitalize mb-4">{{ pokemon.name }}</h2>
                <v-img :src="pokemon.image" alt="Pokemon image" class="mx-auto mb-4 pokemon-image" max-width="200"
                  contain></v-img>

                <v-chip-group class="mb-4">
                  <v-chip v-for="type in pokemon.types" :key="type" color="primary" variant="elevated"
                    class="text-capitalize">
                    {{ type }}
                  </v-chip>
                </v-chip-group>
              </div>

              <v-expansion-panels variant="accordion">
                <v-expansion-panel>
                  <v-expansion-panel-title>Attacks</v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-list lines="one">
                      <v-list-item v-for="(attack, index) in pokemon.attacks" :key="index" :title="attack"
                        prepend-icon="mdi-flash"></v-list-item>
                    </v-list>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel v-if="pokemonDescription">
                  <v-expansion-panel-title>Description</v-expansion-panel-title>
                  <v-expansion-panel-text>
                    {{ pokemonDescription }}
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
