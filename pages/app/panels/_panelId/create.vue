<template>
  <h1>Create</h1>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'app',
  middleware: ['userOnly'],
})
</script>