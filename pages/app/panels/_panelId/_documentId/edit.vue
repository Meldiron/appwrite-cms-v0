<template>
  <div class="p-6 bg-white rounded-md">
    <CoreForm
      v-if="document"
      action="onEditSave"
      :blocks="panel.actions.edit.blocks"
      refPrefix="editBlock"
      :document="document"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '~/services/appwrite'

export default Vue.extend({
  layout: 'app',
  middleware: ['userOnly'],

  data() {
    return {
      panelId: this.$route.params.panelId,
      panel: this.$store.state.config.config.panels[this.$route.params.panelId],
      document: null as any,
    }
  },

  async created() {
    this.document = await AppwriteService.getDocument(
      this.panelId,
      this.$route.params.documentId
    )
  },

  methods: {
    async onSubmit(document: any) {
      const isSuccessful = await AppwriteService.updateDocument(
        this.panelId,
        this.document.$id,
        document
      )
      if (isSuccessful) {
        this.$router.push(`/app/panels/${this.panelId}`)
      }
    },
  },
})
</script>