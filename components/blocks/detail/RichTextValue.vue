<template>
  <div class="flex flex-col space-y-1">
    <div class="text-base text-slate-900">
      <article v-html="documentValue" class="prose"></article>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['config', 'document', 'appwrite', 'documentValue'],
})
</script>