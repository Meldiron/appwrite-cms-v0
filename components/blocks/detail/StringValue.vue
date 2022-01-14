<template>
  <div class="flex flex-col space-y-1">
    <p class="text-lg text-slate-900">
      {{ documentValue }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['config', 'document', 'appwrite', 'documentValue'],
})
</script>