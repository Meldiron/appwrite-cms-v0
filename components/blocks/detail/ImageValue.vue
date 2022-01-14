<template>
  <div class="w-full rounded-md aspect-video bg-slate-200">
    <img
      :src="getSrc(documentValue)"
      class="object-cover object-center w-full h-full rounded-md"
      alt="Image"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '~/services/appwrite'
export default Vue.extend({
  props: ['config', 'document', 'appwrite', 'documentValue'],
  methods: {
    getSrc(fileId: string) {
      return AppwriteService.previewFile(fileId)
    },
  },
})
</script>