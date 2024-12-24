<script setup lang="ts">
import { fetchPokemon } from '@/queries/pokemon';
import { getWikipediaApiUrl } from '@/config';
import { Pokemon, WikipediaPage, WikipediaResponse } from '@/types';

definePageMeta({
  layout: "base-layout",
});


const pokemonName = ref<string>('');
const pokemon = ref<Pokemon | null>(null);
const pokemonDescription = ref('');

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
      console.log('fetching pokemon data');
      const fetchedPokemon = await fetchPokemon(pokemonName.value);
      pokemon.value = fetchedPokemon;

      const description = await fetchPokemonDescription(pokemonName.value);
      pokemonDescription.value = description;
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  }
};

</script>

<template #default>
  <div>
    <h1>Pokémon Search</h1>
    <input v-model="pokemonName" placeholder="Enter Pokémon name" />
    <button @click="fetchPokemonData">Search</button>
    <div v-if="pokemon">
      <h2>{{ pokemon.name }}</h2>
      <img :src="pokemon.image" alt="Pokemon image" />
      <p>Types: {{ pokemon.types.join(', ') }}</p>
      <div>
        <h3>Attacks:</h3>
        <ul>
          <li v-for="(attack, index) in pokemon.attacks" :key="index">{{ attack }}</li>
        </ul>
      </div>
      <div v-if="pokemonDescription">
        <h3>Description:</h3>
        <p>{{ pokemonDescription }}</p>
      </div>
    </div>
  </div>
</template>