<template>
  <div>
    <input
      class="
        w-full
        p-4
        bg-white
        border-4
        rounded-md
        border-slate-200
        focus:outline-none focus:ring
        ring-gray-600
      "
      v-model="value"
      type="text"
      :placeholder="config.placeholder"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['config', 'appwrite', 'document'],
  methods: {
    async $append(objectDraft: any) {
      objectDraft[this.config.attributeKey] = this.value || undefined

      return objectDraft
    },
  },
  data() {
    return {
      value: this.document ? this.document[this.config.attributeKey] : '',
    }
  },
})
</script>