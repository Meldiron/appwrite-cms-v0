<template>
  <div class="flex flex-col space-y-1">
    <p class="text-lg text-slate-900">
      {{ relatedValue }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['config', 'document', 'appwrite', 'documentValue'],
  data() {
    return {
      relatedValue: '...',
    }
  },
  async created() {
    const doc = await this.appwrite
      ._db()
      .getDocument(this.config.collection, this.documentValue)
    this.relatedValue = doc[this.config.attribute]
  },
})
</script>