<script setup lang="ts">
import { fetchAllPokemon } from '@/queries/pokemon';
import type { Pokemon } from '@/types/pokemon';
import TypeIcon from '@/components/atoms/TypeIcon.vue';
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
  return pokemonList.value.filter((pokemon) =>
    pokemon.types.some(type => selectedTypes.value.includes(type))
  );
});

onMounted(() => {
  loadPokemonList();
});

</script>

<template #default>
  <v-container>
    <v-row>
      <v-select v-model="selectedTypes" clearable :items="Object.keys(typeColors)" label="Type" multiple>
        <!-- Selected items display -->
        <template v-slot:selection="{ item }">
          <TypeIcon :type="item.value.toLowerCase()" size="24px" class="mr-2" />
          {{ item.value }}
        </template>

        <!-- Menu items display -->
        <template v-slot:item="{ item, props }">
          <v-list-item v-bind="props">
            <template v-slot:prepend>
              <TypeIcon :type="item.value.toLowerCase()" size="24px" class="mr-2" />
            </template>
          </v-list-item>
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
                <TypeIcon v-for="(type, index) in pokemon.types" :key="index" :type="type.toLowerCase()" size="32px"
                  class="mr-2" />
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
  color: black !important;
}
</style>
