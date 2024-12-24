<script setup lang="ts">
import { fetchAllPokemon } from '@/queries/pokemon';
import type { Pokemon } from '@/types/pokemon';

definePageMeta({
  layout: "base-layout",
});


const pokemonList = ref<Pokemon[]>([]);

const loadPokemonList = async () => {
  const response = await fetchAllPokemon();
  pokemonList.value = response;
};

onMounted(() => {
  loadPokemonList();
});


</script>

<template #default>
  <v-container>
    <v-row>
      <v-col v-for="pokemon in pokemonList" :key="pokemon.name" cols="12" md="4">
        <v-card class="mb-3" max-width="300" max-height="400">
          <v-img :src="pokemon.image" height="200px" class="mt-3" />
          <v-card-title>{{ pokemon.name }}</v-card-title>
          <v-card-text>
            <v-row class="justify-start">
              <v-col>
                <v-chip v-for="(type, index) in pokemon.types" :key="index" class="mr-2">
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
