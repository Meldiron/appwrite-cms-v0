<template>
  <div class="p-6 bg-white rounded-md">
    <div v-if="document" class="flex flex-col max-w-lg space-y-6">
      <div
        :key="blockIndex"
        v-for="(block, blockIndex) in panel.actions.view.blocks"
      >
        <component
          v-bind:is="'Blocks' + block.type"
          :config="block.config"
          :document="document"
          :appwrite="appwrite"
        ></component>
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