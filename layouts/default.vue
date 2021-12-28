<template>
  <Nuxt />
</template>

<script lang="ts">
import Vue from 'vue'
import { Utils } from '../services/utils'
import { mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters('config', ['config', 'menuTree']),
  },
  head() {
    return Utils.generateHead(this.config)
  },
})
</script>