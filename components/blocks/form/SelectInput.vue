<template>
  <div class="flex flex-col space-y-1">
    <select
      class="w-full p-4 bg-white border-4 rounded-md  border-slate-200 focus:outline-none focus:ring ring-gray-600"
      v-model="value"
    >
      <option
        :key="optionIndex"
        v-for="(option, optionIndex) of config.options"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
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
        options?: {
          value: string
          name: string
        }[]
      },
    },
  },
})
</script>