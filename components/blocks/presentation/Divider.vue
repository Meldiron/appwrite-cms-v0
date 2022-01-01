<template>
  <div class="flex items-center justify-start space-x-3">
    <div
      class="flex items-center justify-center w-10 h-10 rounded-md bg-slate-100"
      v-if="config.icon"
    >
      {{ config.icon }}
    </div>
    <h1 class="text-3xl font-semibold text-slate-900">{{ config.text }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['config', 'document', 'appwrite'],
})
</script>