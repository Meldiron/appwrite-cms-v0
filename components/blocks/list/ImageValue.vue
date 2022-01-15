<template>
  <div>
    <div
      @click="onEnableFullscreen"
      class="w-8 h-8 rounded-md shadow-inner cursor-pointer aspect-square"
    >
      <img
        :src="appwrite.previewFile(documentValue)"
        class="object-cover object-center w-full h-full rounded-md"
        alt=""
      />
    </div>

    <div v-if="isFullscreen" class="fixed inset-0">
      <div
        class="flex items-center justify-center w-full h-full bg-black bg-opacity-50 "
      >
        <div class="flex flex-col items-center space-y-2">
          <img
            class="max-h-[80vh] max-w-[80vw]"
            :src="appwrite.previewFile(documentValue)"
            alt=""
          />

          <button
            @click="onCloseFullscreen"
            class="text-lg font-light text-white hover:underline"
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
export default Vue.extend({
  props: ['config', 'document', 'appwrite', 'documentValue'],
  data() {
    return {
      isFullscreen: false,
    }
  },
  methods: {
    onCloseFullscreen() {
      this.isFullscreen = false
    },
    onEnableFullscreen() {
      this.isFullscreen = true
    },
  },
})
</script>