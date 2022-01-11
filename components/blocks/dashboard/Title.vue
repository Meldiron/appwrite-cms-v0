<template>
  <div>
    <h1 class="my-4 text-3xl font-bold">
      {{ config.value || 'Title without name' }}
    </h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['config', 'appwrite'],
})
</script>
