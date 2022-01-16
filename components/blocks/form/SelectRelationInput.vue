<template>
  <div class="flex flex-col space-y-1">
    <select
      class="w-full p-4 bg-white border-4 rounded-md  border-slate-200 focus:outline-none focus:ring ring-gray-600"
      v-model="value"
    >
      <option
        :key="optionIndex"
        v-for="(option, optionIndex) of options"
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
      options: [],
    }
  },
  async created() {
    const docs = await this.appwrite
      ._db()
      .listDocuments(this.config.collection, [], 100)

    this.options = docs.documents.map((doc: any) => {
      return {
        value: doc.$id,
        name: doc[this.config.attribute],
      }
    })
  },
})
</script>