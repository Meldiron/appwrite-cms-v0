<template>
  <div>
    <h1 class="my-4 text-3xl font-bold">
      {{ config.value || 'Title without name' }}
    </h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '../../../services/appwrite'

export default Vue.extend({
  props: {
    appwrite: {
      required: true,
      type: Object as () => typeof AppwriteService,
    },
    config: {
      required: true,
      type: Object as () => {
        value?: string
      },
    },
  },
})
</script>
