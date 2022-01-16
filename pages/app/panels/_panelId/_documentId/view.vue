<template>
  <div class="p-6 bg-white rounded-md">
    <div v-if="document" class="flex flex-col max-w-2xl space-y-6">
      <div
        :key="blockIndex"
        v-for="(block, blockIndex) in panel.actions.view.blocks"
      >
        <div v-if="block.array === false">
          <h1 v-if="block.name" class="mb-1 text-sm font-light text-slate-900">
            {{ block.name }}
          </h1>
          <component
            v-bind:is="'Blocks' + block.type"
            :config="block.config"
            :document="document"
            :documentValue="document[block.attribute]"
            :appwrite="appwrite"
          ></component>
          <p
            class="mt-1 text-sm italic font-light text-slate-400"
            v-if="block.note"
          >
            {{ block.note }}
          </p>
        </div>

        <div v-if="block.array === true" class="relative">
          <div class="absolute top-0 h-full -left-3">
            <div class="w-1 h-full rounded-full bg-slate-100"></div>
          </div>

          <h1 v-if="block.name" class="mb-1 text-sm font-light text-slate-900">
            {{ block.name }}
          </h1>

          <div
            class="flex flex-col mb-2 space-y-2"
            v-if="document[block.attribute].length > 0"
          >
            <component
              v-for="(val, valIndex) of document[block.attribute]"
              :key="valIndex"
              v-bind:is="'Blocks' + block.type"
              :config="block.config"
              :document="document"
              :documentValue="val"
              :appwrite="appwrite"
            ></component>
          </div>

          <p
            class="mt-1 text-sm italic font-light text-slate-400"
            v-if="block.note"
          >
            {{ block.note }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '~/services/appwrite'

export default Vue.extend({
  layout: 'app',
  middleware: ['userOnly'],

  data() {
    const panel =
      this.$store.state.config.config.panels[this.$route.params.panelId]

    return {
      panel: panel || null,
      panelId: this.$route.params.panelId,
      document: null,
      appwrite: AppwriteService,
    }
  },

  async created() {
    this.document = await AppwriteService.getDocument(
      this.panelId,
      this.$route.params.documentId
    )
  },
})
</script>