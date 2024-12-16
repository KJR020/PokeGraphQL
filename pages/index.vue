<script setup lang="ts">
import { fetchPokemon } from '~/queries/pokemon';

definePageMeta({
  layout: "base-layout",
});

const pokemonName = ref('');
const pokemon = ref(null);

const fetchPokemonData = async () => {
  if (pokemonName.value) {
    try {
      console.log('fetching pokemon data');
      pokemon.value = await fetchPokemon(pokemonName.value);
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