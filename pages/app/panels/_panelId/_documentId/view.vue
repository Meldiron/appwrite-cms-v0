<template>
  <div class="p-6 bg-white rounded-md">
    <div v-if="document" class="flex flex-col space-y-6">
      <div
        :key="blockIndex"
        v-for="(block, blockIndex) in panel.actions.view.blocks"
      >
        <component
          v-bind:is="'View' + block.type"
          :config="block.config"
          :document="document"
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
    const panel = this.$store.state.config.config.panels.find(
      (p: any) => p.id === this.$route.params.panelId
    )

    return {
      panel: panel || null,
      document: null,
    }
  },

  async created() {
    this.document = await AppwriteService.getDocument(
      this.panel.id,
      this.$route.params.documentId
    )
  },
})
</script>