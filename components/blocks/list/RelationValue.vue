<template>
  <div class="flex flex-col space-y-1">
    <p
      class="text-lg"
      v-bind:class="relatedValue ? 'text-slate-900' : 'text-slate-400'"
    >
      {{ shortify(relatedValue ? relatedValue.toString() : 'Not set') }}
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
  data() {
    return {
      relatedValue: '...',
    }
  },
  async created() {
    if (!this.config.collection || !this.config.attribute) {
      alert('Component ListRelationValue not configured properly!')
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