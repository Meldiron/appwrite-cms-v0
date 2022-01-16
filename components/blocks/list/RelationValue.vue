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
export default Vue.extend({
  props: ['config', 'document', 'appwrite', 'documentValue'],
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
      relatedValue: "..."
    }
  },
  async created() {
    const doc = await this.appwrite._db().getDocument(this.config.collection, this.documentValue);
    this.relatedValue = doc[this.config.attribute];
  }
})
</script>