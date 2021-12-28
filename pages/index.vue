<template></template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '~/services/appwrite'

// Dummy component, simply redirects. Used for better route naming conventions
export default Vue.extend({
  middleware: [
    'loadConfig',
    async function ({ redirect }) {
      const isLogged = await AppwriteService.isLogged()
      redirect(isLogged ? '/app' : '/login')
    },
  ],
})
</script>