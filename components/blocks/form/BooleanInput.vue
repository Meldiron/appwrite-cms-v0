<template>
  <div class="flex flex-col space-y-1">
    <button
      type="button"
      class="w-[fit-content] flex items-center justify-start"
      @click="onToggleValue"
    >
      <div
        v-bind:class="
          value
            ? 'bg-slate-900 text-slate-50 hover:bg-slate-800'
            : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
        "
        class="px-6 py-2 border-r rounded-l-md"
      >
        Yes
      </div>
      <div
        v-bind:class="
          !value
            ? 'bg-slate-900 text-slate-50 hover:bg-slate-800'
            : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
        "
        class="px-6 py-2 rounded-r-md"
      >
        No
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '~/services/appwrite'
import { AppwriteDocument } from '~/ts-shim'

export default Vue.extend({
  methods: {
    async $output() {
      return this.value
    },
    onToggleValue() {
      this.value = !this.value
    },
  },
  data() {
    return {
      value: this.documentValue,
    }
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