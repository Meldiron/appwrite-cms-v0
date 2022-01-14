<template>
  <div class="flex flex-col space-y-1">
    <input
      class="w-full p-4 bg-white border-4 rounded-md  border-slate-200 focus:outline-none focus:ring ring-gray-600"
      v-model="value"
      type="date"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['config', 'appwrite', 'document', 'documentValue'],
  methods: {
    async $output() {
      return this.value ? new Date(this.value).getTime() : undefined
    },
  },
  data() {
    const unixTimestamp = this.documentValue

    const date = unixTimestamp ? new Date(unixTimestamp) : undefined
    const value = date
      ? `${date.getFullYear()}-${
          date.getMonth() + 1 < 10
            ? '0' + date.getMonth() + 1
            : date.getMonth() + 1
        }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
      : ''

    return {
      value,
    }
  },
})
</script>