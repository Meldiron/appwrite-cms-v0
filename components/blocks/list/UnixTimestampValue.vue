<template>
  <div class="flex flex-col space-y-1">
    <p
      class="text-lg"
      v-bind:class="documentValue ? 'text-slate-900' : 'text-slate-400'"
    >
      {{ datify(documentValue ? documentValue : undefined) }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['config', 'document', 'appwrite', 'documentValue'],
  methods: {
    datify(timestamp: number) {
      if (!timestamp) {
        return ''
      }

      const date = new Date(timestamp)
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    },
  },
})
</script>