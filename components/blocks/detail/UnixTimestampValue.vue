<template>
  <div class="flex flex-col space-y-1">
    <p class="text-lg text-slate-900">
      {{ parseDate(documentValue) }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '~/services/appwrite'
import { AppwriteDocument } from '~/ts-shim'

export default Vue.extend({
  methods: {
    parseDate(dateTimestamp: number) {
      const date = new Date(dateTimestamp)

      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    },
  },
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