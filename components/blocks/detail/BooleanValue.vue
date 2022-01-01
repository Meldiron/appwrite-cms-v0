<template>
  <div class="flex flex-col space-y-1">
    <h1 v-if="config.attributeName" class="text-sm font-light text-slate-900">
      {{ config.attributeName }}
    </h1>

    <div class="flex items-center justify-start pt-2">
      <div
        v-bind:class="
          document[config.attributeKey]
            ? 'bg-slate-900 text-slate-50'
            : 'bg-slate-200 text-slate-900'
        "
        class="px-6 py-2 border-r rounded-l-md"
      >
        Yes
      </div>
      <div
        v-bind:class="
          !document[config.attributeKey]
            ? 'bg-slate-900 text-slate-50'
            : 'bg-slate-200 text-slate-900'
        "
        class="px-6 py-2 rounded-r-md"
      >
        No
      </div>
    </div>

    <p class="text-sm italic font-light text-slate-400" v-if="config.note">
      {{ config.note }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['config', 'document', 'appwrite'],
})
</script>