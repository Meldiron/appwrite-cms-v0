<template>
  <div class="flex flex-col w-full space-y-1">
    <div
      class="w-full p-4 bg-white border-4 rounded-md  border-slate-200 focus:outline-none focus:ring ring-gray-600"
    >
      <client-only>
        <VueEditor
          @image-added="handleImageAdded"
          :useCustomImageHandler="true"
          class="w-full"
          v-model="value"
        />
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '~/services/appwrite'
import { AppwriteDocument } from '~/ts-shim'

export default Vue.extend({
  methods: {
    async $output() {
      return this.value
    },
    handleImageAdded: async function (
      file: any,
      Editor: any,
      cursorLocation: any,
      resetUploader: any
    ) {
      console.log('Handling')
      // TODO: Allow custom permissions and custom ID
      const appwriteFile = await this.appwrite.uploadFile(
        'unique()',
        file,
        ['role:all'],
        []
      )

      Editor.insertEmbed(
        cursorLocation,
        'image',
        this.appwrite.previewFile(appwriteFile.$id)
      )
      resetUploader()
    },
  },
  data() {
    return {
      value: this.documentValue,
    }
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
        // No config options yet
      },
    },
  },
})
</script>