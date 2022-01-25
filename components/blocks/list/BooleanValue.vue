<template>
  <div class="flex items-center justify-center w-full h-full">
    <svg
      v-bind:class="documentValue === true ? 'text-green-500' : 'text-red-500'"
      viewBox="0 0 8 8"
      class="w-3 h-3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="4" fill="currentColor"></circle>
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '~/services/appwrite'
import { AppwriteDocument } from '~/ts-shim'

export default Vue.extend({
  props: {
    appwrite: {
      required: true,
      type: Object as () => typeof AppwriteService,
    },
    document: {
      required: true,
      type: Object as () => AppwriteDocument,
    },
    documentValue: {
      required: true,
      type: Object as () => any,
    },
    config: {
      required: true,
      type: Object as () => {
        // No config options yet
      },
    },
  },
})
</script>