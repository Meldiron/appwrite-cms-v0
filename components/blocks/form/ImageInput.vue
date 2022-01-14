<template>
  <div class="flex flex-col space-y-1">
    <div
      class="w-full p-4 bg-white border-4 rounded-md  border-slate-200 focus:outline-none focus:ring ring-gray-600"
    >
      <img
        v-if="file && file !== 'EMPTY'"
        class="w-full mb-4 rounded-md"
        :src="getFileSrc(file)"
        alt="Image"
      />

      <div class="flex items-center justify-between">
        <input @change="setFile" type="file" />

        <button
          v-if="file && file !== 'EMPTY'"
          @click="removeFile"
          type="button"
          class="flex items-center justify-center group"
        >
          <div
            class="p-3 text-sm rounded-md  text-slate-800 group-hover:bg-slate-200 bg-slate-100"
          >
            Remove file
          </div>
        </button>
      </div>
    </div>

    <p class="text-sm italic font-light text-slate-400" v-if="config.note">
      {{ config.note }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '~/services/appwrite'
export default Vue.extend({
  props: ['config', 'appwrite', 'document'],
  methods: {
    getFileSrc(file: any) {
      if (typeof file === 'string') {
        return file
      } else {
        return URL.createObjectURL(file)
      }
    },
    removeFile() {
      this.file = 'EMPTY'
      this.didFileChange = true
    },
    setFile(event: any) {
      event.preventDefault()
      this.didFileChange = true

      if (event.target.files && event.target.files.length > 0) {
        this.file = event.target.files[0]
      } else {
        this.file = 'EMPTY'
      }
    },
    async $append(objectDraft: any) {
      if (this.didFileChange) {
        if (this.file === 'EMPTY') {
          objectDraft[this.config.attributeKey] = ''
        } else {
          // TODO: Allow cusotm ID, allow custon read&write permissions
          const fileResponse = await this.appwrite.uploadFile(
            'unique()',
            this.file,
            ['role:all'],
            []
          )
          objectDraft[this.config.attributeKey] = fileResponse.$id
        }
      }

      return objectDraft
    },
  },
  data() {
    let file =
      this.config.attributeKey && this.document
        ? this.document[this.config.attributeKey]
        : null

    if (file) {
      file = AppwriteService.previewFile(file)
    }

    return {
      didFileChange: false,
      file: file,
    }
  },
})
</script>