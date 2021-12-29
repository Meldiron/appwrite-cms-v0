<template>
  <div class="aspect-video w-full max-w-[500px] rounded-md bg-slate-200">
    <img
      :src="getSrc(document[config.attributeKey])"
      class="object-cover object-center w-full h-full rounded-md"
      alt="Image"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '~/services/appwrite'
export default Vue.extend({
  props: ['config', 'document'],
  methods: {
    getSrc(fileId: string) {
      return AppwriteService.previewFile(fileId)
    },
  },
})
</script>