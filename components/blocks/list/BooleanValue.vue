<template>
  <div class="flex items-center justify-center w-full h-full">
    <svg
      v-bind:class="
        document[config.attributeKey] === true ? 'bg-green-500' : 'bg-red-500'
      "
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="4" fill="currentColor"></circle>
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['config', 'document', 'appwrite'],
  methods: {
    shortify(str: string) {
      if (str.length <= 50) {
        return str
      }

      return str.substring(0, 50) + '...'
    },
  },
})
</script>