<script setup lang="ts">
// Array of Pokémon types to demonstrate
const types = ['fire', 'water', 'grass', 'electric', 'psychic']
</script>

<template>
  <v-list rounded="lg">
    <v-list-item v-for="type in types" :key="type" link>
      <template v-slot:prepend>
        <TypeIcon :type="type" size="24px" />
      </template>
      <v-list-item-title>{{ type.charAt(0).toUpperCase() + type.slice(1) }} Type</v-list-item-title>
    </v-list-item>
    <v-divider class="my-2"></v-divider>
    <v-list-item color="grey-lighten-4" title="Refresh" link></v-list-item>
  </v-list>
</template>
