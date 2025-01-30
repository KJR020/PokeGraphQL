<script setup lang="ts">
import Sidebar from '@/components/organisms/Sidebar.vue';
</script>

<template>
  <v-main class="bg-grey-lighten-3">
    <v-container class="min-h-screen">
      <v-row>
        <!-- <v-col cols="2">
          <Sidebar />
        </v-col> -->
        <v-col>
          <NuxtPage />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
.min-h-screen {
  min-height: calc(100vh - 64px);
}
</style>
