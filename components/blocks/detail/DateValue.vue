<template>
  <div class="flex flex-col space-y-1">
    <p class="text-lg text-slate-900">
      {{ parseDate(documentValue) }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['config', 'document', 'appwrite', 'documentValue'],
  methods: {
    parseDate(dateTimestamp: number) {
      const date = new Date(dateTimestamp * 1000)

      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    },
  },
})
</script>