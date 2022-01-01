<template>
  <div class="flex flex-col space-y-1">
    <h1 v-if="config.attributeName" class="text-sm font-light text-slate-900">
      {{ config.attributeName }}
    </h1>
    <p class="text-lg text-slate-900">
      {{ config.prefix }}{{ parseDate(document[config.attributeKey])
      }}{{ config.suffix }}
    </p>
    <p class="text-sm italic font-light text-slate-400" v-if="config.note">
      {{ config.note }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['config', 'document', 'appwrite'],
  methods: {
    parseDate(dateTimestamp: number) {
      const date = new Date(dateTimestamp * 1000)

      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    },
  },
})
</script>