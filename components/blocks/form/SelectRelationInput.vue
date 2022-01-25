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
      options: [] as { value: string; name: string }[],
    }
  },
  async created() {
    if (!this.config.collection || !this.config.attribute) {
      alert('Component FormSelectRelationInput not configured properly!')
      return
    }

    const attribute = this.config.attribute

    const docs = await this.appwrite
      ._db()
      .listDocuments(this.config.collection, [], 100)

    this.options = docs.documents.map((doc: any) => {
      return {
        value: doc.$id,
        name: doc[attribute],
      }
    })
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
        collection?: string
        attribute?: string
      },
    },
  },
})
</script>