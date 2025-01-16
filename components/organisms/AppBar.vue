<script setup lang="ts">
import { useLocale } from 'vuetify';


const links = [
  { name: 'Home', path: '/' },
  { name: 'List', path: '/list' },
  // { name: 'Favorite', path: '/favorite' },
]

useLocale()

</script>

<template>
  <v-app-bar flat>
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-avatar class="me-4" size="32">
        <v-img src="/pokeball-icon.png" alt="Pokeball Icon" class="rotate-on-hover"></v-img>
      </v-avatar>
      <v-btn v-for="link in links" :key="link.name" :text="link.name" :to="link.path" variant="text"></v-btn>
      <v-spacer></v-spacer>
      <v-responsive max-width="160">
        <v-text-field density="compact" label="Search" rounded="lg" variant="solo-filled" flat hide-details
          single-line></v-text-field>
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
.rotate-on-hover {
  transition: transform 0.3s ease;
}

.rotate-on-hover:hover {
  transform: rotate(180deg);
}
</style>
