<template>
  <div class="flex flex-col space-y-1">
    <p
      class="text-lg"
      v-bind:class="
        document[config.attributeKey] ? 'text-slate-900' : 'text-slate-400'
      "
    >
      {{ config.prefix
      }}{{ shortify(document[config.attributeKey] || 'Not set')
      }}{{ config.suffix }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['config', 'document', 'appwrite'],
  methods: {
    shortify(str: string) {
      if (str.length <= 50) {
        return str
      }

      return str.substring(0, 50) + '...'
    },
  },
})
</script>