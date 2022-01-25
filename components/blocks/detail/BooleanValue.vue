<template>
  <div class="flex flex-col space-y-1">
    <div class="flex items-center justify-start pt-2">
      <div
        v-bind:class="
          documentValue
            ? 'bg-slate-900 text-slate-50'
            : 'bg-slate-200 text-slate-900'
        "
        class="px-6 py-2 border-r rounded-l-md"
      >
        Yes
      </div>
      <div
        v-bind:class="
          !documentValue
            ? 'bg-slate-900 text-slate-50'
            : 'bg-slate-200 text-slate-900'
        "
        class="px-6 py-2 rounded-r-md"
      >
        No
      </div>
    </div>
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