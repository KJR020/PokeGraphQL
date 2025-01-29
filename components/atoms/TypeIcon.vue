<script setup lang="ts">
/**
 * Pokemon type icons from https://github.com/partywhale/pokemon-type-icons
 * Copyright (c) 2022 James Watkins
 * Licensed under MIT License
 */
import { defineProps, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: '18px'
  }
})

const imageSrc = computed(() => `/pokemon-type-icons/${props.type}.svg`)
const altText = computed(() => `${props.type} type icon`)
</script>

<template>
  <img :src="imageSrc" :width="size" :height="size" :alt="altText" />
</template>

<style scoped>
/* Add any necessary styling here */
</style>