<template>
  <div class="flex flex-col space-y-1">
    <p
      class="text-lg"
      v-bind:class="documentValue ? 'text-slate-900' : 'text-slate-400'"
    >
      {{ shortify(documentValue ? documentValue.toString() : 'Not set') }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '~/services/appwrite'
import { AppwriteDocument } from '~/ts-shim'

export default Vue.extend({
  methods: {
    shortify(str: string) {
      if (str.length <= 50) {
        return str
      }

      return str.substring(0, 50) + '...'
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