<script setup lang="ts">
import Sidebar from '@/components/organisms/Sidebar.vue';
</script>

<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>
        <v-col cols="2">
          <Sidebar />
        </v-col>
        <v-col>
          <v-sheet min-height="70vh" rounded="lg">
            <NuxtPage />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
