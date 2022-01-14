<template>
  <div class="p-6 bg-white rounded-md">
    <CoreForm
      action="onCreateSave"
      :blocks="panel.actions.create.blocks"
      refPrefix="createBlock"
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
    }
  },

  async created() {},

  methods: {
    async onSubmit(document: any) {
      const isSuccessful = await AppwriteService.createDocument(
        this.panelId,
        document
      )
      if (isSuccessful) {
        this.$router.push(`/app/panels/${this.panelId}`)
      }
    },
  },
})
</script>