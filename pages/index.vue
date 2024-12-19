<script setup lang="ts">
import { fetchPokemon } from '@/queries/pokemon';

definePageMeta({
  layout: "base-layout",
});

interface Pokemon {
  name: string;
  image: string;
  types: string[];
  attacks: string[];
}

const pokemonName = ref<string>('');
const pokemon = ref<Pokemon | null>(null);
// const pokemonDescription = ref('');

// const fetchPokemonDescription = async (name: string) => {
//   try {
//     const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&titles=${name}_(Pok%C3%A9mon)&origin=*`);
//     const data = await response.json();
//     const pages = data.query.pages;
//     const page = Object.values(pages)[0];
//     pokemonDescription.value = page.extract;
//   } catch (error) {
//     console.error('Error fetching Pokemon description:', error);
//   }
// };


const fetchPokemonData = async () => {
  if (pokemonName.value) {
    try {
      console.log('fetching pokemon data');
      pokemon.value = await fetchPokemon(pokemonName.value);
      // await fetchPokemonDescription(pokemonName.value);
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
    </div>
  </div>
</template>