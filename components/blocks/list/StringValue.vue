<template>
  <div class="flex flex-col space-y-1">
    <p
      class="text-lg"
      v-bind:class="
        document[config.attributeKey] ? 'text-slate-900' : 'text-slate-400'
      "
    >
      {{ config.prefix }}{{ document[config.attributeKey] || 'Not set'
      }}{{ config.suffix }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['config', 'document', 'appwrite'],
})
</script>