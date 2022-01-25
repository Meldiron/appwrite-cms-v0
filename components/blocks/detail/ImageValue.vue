<template>
  <div class="w-full rounded-md aspect-video bg-slate-200">
    <img
      :src="getSrc(documentValue)"
      class="object-cover object-center w-full h-full rounded-md cursor-pointer"
      alt="Image"
      @click="onEnableFullscreen"
    />

    <div v-if="isFullscreen" class="fixed inset-0">
      <div
        class="absolute z-[9] w-full h-full bg-black bg-opacity-50"
        @click="onCloseFullscreen"
      ></div>
      <div
        class="
          relative
          z-[10]
          pointer-events-none
          w-full
          h-full
          flex
          items-center
          justify-center
        "
      >
        <div class="flex flex-col items-center space-y-2">
          <img
            class="max-h-[80vh] max-w-[80vw] pointer-events-auto"
            :src="appwrite.previewFile(documentValue)"
            alt=""
          />

          <button
            @click="onCloseFullscreen"
            class="text-lg font-light text-white pointer-events-auto  hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '~/services/appwrite'
import { AppwriteDocument } from '~/ts-shim'

export default Vue.extend({
  data() {
    return {
      isFullscreen: false,
    }
  },
  methods: {
    getSrc(fileId: string) {
      return AppwriteService.previewFile(fileId)
    },

    onCloseFullscreen() {
      this.isFullscreen = false
    },
    onEnableFullscreen() {
      this.isFullscreen = true
    },
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