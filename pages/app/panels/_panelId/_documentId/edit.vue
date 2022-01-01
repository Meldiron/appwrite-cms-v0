<template>
  <div class="p-6 bg-white rounded-md">
    <form
      v-if="document"
      v-on:submit.prevent="SET_ACTION('onEditSave')"
      class="flex flex-col max-w-lg space-y-6"
    >
      <div
        :key="blockIndex"
        v-for="(block, blockIndex) in panel.actions.edit.blocks"
      >
        <component
          :ref="'createBlock' + blockIndex"
          v-bind:is="'Blocks' + block.type"
          :config="block.config"
          :document="document"
          :appwrite="appwrite"
        ></component>
      </div>

      <button type="submit" class="hidden">Hidden submit button</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { AppwriteService } from '~/services/appwrite'

export default Vue.extend({
  layout: 'app',
  middleware: ['userOnly'],

  data() {
    return {
      panelId: this.$route.params.panelId,
      panel: this.$store.state.config.config.panels[this.$route.params.panelId],
      document: null as any,
      appwrite: AppwriteService.getAppwrite(),
    }
  },

  async created() {
    this.document = await AppwriteService.getDocument(
      this.panelId,
      this.$route.params.documentId
    )
  },

  computed: {
    ...mapGetters('headerActions', ['GET_OMITTER']),
  },

  watch: {
    GET_OMITTER: {
      handler(newAction) {
        if (newAction === 'onEditSave') {
          this.onSubmit()
        }
      },
    },
  },

  methods: {
    ...mapMutations('headerActions', ['SET_LOADING']),
    ...mapActions('headerActions', ['SET_ACTION']),
    async onSubmit() {
      this.SET_LOADING(true)

      let document = {}

      let i = 0
      for (const block of this.panel.actions.edit.blocks) {
        const component = this.$refs['createBlock' + i]
        let appendMethod = undefined

        try {
          // @ts-ignore
          appendMethod = component[0].$append
        } catch (err) {
          // I dont care. Incorrect component implementation
        }

        if (appendMethod) {
          document = appendMethod(document)
        }

        i++
      }

      const isSuccessful = await AppwriteService.updateDocument(
        this.panelId,
        this.document.$id,
        document
      )
      if (isSuccessful) {
        this.$router.push(`/app/panels/${this.panelId}`)
      }

      this.SET_LOADING(false)
    },
  },
})
</script>