<template>
  <div class="flex flex-col space-y-1">
    <p class="text-lg text-slate-900">
      {{ relatedValue }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '~/services/appwrite'
import { AppwriteDocument } from '~/ts-shim'

export default Vue.extend({
  data() {
    return {
      relatedValue: '...',
    }
  },
  async created() {
    if (!this.config.collection || !this.config.attribute) {
      alert('Component DetailRelationValue not configured properly!')
      return
    }

    const doc: any = await this.appwrite
      ._db()
      .getDocument(this.config.collection, this.documentValue)
    this.relatedValue = doc[this.config.attribute]
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