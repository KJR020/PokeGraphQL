<script setup lang="ts">
import { fetchAllPokemon } from '@/queries/pokemon';
import type { Pokemon } from '@/types/pokemon';
import { NuxtErrorBoundary } from '../.nuxt/components';

definePageMeta({
  layout: "base-layout",
});


const pokemonList = ref<Pokemon[]>([]);
const selectedTypes = ref<string[]>([]);

const typeColors: Record<string, string> = {
  Normal: 'grey',
  Fire: 'red',
  Water: 'blue',
  Electric: 'yellow',
  Grass: 'green',
  Ice: 'cyan',
  Fighting: 'brown',
  Poison: 'purple',
  Ground: 'sienna',
  Flying: 'skyblue',
  Psychic: 'pink',
  Bug: 'lime',
  Rock: 'darkgrey',
  Ghost: 'indigo',
  Dark: 'black',
  Dragon: 'orange',
  Steel: 'silver',
  Fairy: 'magenta'
};

const loadPokemonList = async () => {
  const response = await fetchAllPokemon();
  pokemonList.value = response;
};

const filteredPokemonList = computed(() => {
  if (selectedTypes.value.length === 0) {
    return pokemonList.value;
  }
  return pokemonList.value.filter((pokemon) => pokemon.types.some(type => selectedTypes.value.includes(type)));
})

onMounted(() => {
  loadPokemonList();
});

</script>

<template #default>
  <v-container>
    <v-row>
      <v-select v-model="selectedTypes" clearable :items="Object.keys(typeColors)" item-text="key" item-value="key"
        label="Type" multiple>
        <template #selection="{ item }">
          <v-chip :color="typeColors[item.value]">
            {{ item.title }}
          </v-chip>
        </template>
      </v-select>
    </v-row>
    <v-row>
      <v-col v-for="pokemon in filteredPokemonList" :key="pokemon.name" cols="12" md="4">
        <v-card class="mb-3" max-width="300" max-height="400">
          <v-img :src="pokemon.image" height="200px" class="mt-3" />
          <v-card-title>{{ pokemon.name }}</v-card-title>
          <v-card-text>
            <v-row class="justify-start">
              <v-col>
                <v-chip v-for="(type, index) in pokemon.types" :key="index" class="mr-2" :color="typeColors[type]">
                  {{ type }}
                </v-chip>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.v-input__control .v-icon {
  opacity: 1 !important;
  /* 非フォーカス時でも表示 */
  color: black !important;
  /* 背景とコントラストを調整 */
}
</style>
