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
export default Vue.extend({
  props: ['config', 'appwrite', 'document', 'documentValue'],
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
})
</script>