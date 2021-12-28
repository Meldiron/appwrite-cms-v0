<template>
  <div class="flex w-screen h-screen">
    <div
      class="
        flex-shrink-0
        w-[300px]
        h-full
        flex flex-col
        from-slate-900
        via-slate-900
        to-black
        bg-gradient-to-b
      "
    >
      <div
        class="flex items-center w-full p-3 space-x-3 text-white shadow-md  bg-slate-800"
      >
        <div
          class="flex items-center justify-center w-12 h-12 rounded-md  bg-slate-100 text-slate-600"
        >
          {{ config.theme.projectLogo }}
        </div>

        <div
          class="flex-1 w-20 overflow-x-hidden text-lg font-semibold  whitespace-nowrap"
        >
          <p class="text-ellipsis">{{ config.theme.projectName }}</p>
        </div>
      </div>

      <div class="p-3">
        <coreMenuTree :menuTree="menuTree" :level="1" />
      </div>
    </div>

    <div class="w-full h-full from-slate-100 to-slate-50 bg-gradient-to-b">
      <div
        class="
          w-full
          h-[4.5rem]
          bg-white
          shadow-md
          flex
          items-center
          justify-between
          px-6
        "
      >
        <div v-if="panel">
          <h1 class="text-xl font-semibold text-slate-900">
            {{ panel.icon ? panel.icon + ' ' : '' }}{{ panel.name }}
          </h1>
          <p class="text-sm text-slate-500">{{ panel.description }}</p>
        </div>
        <div v-if="!panel">
          <h1 class="text-xl font-semibold text-slate-900">👋 Welcome</h1>
          <p class="text-sm text-slate-500">
            Glad to see you. Happy administrating!
          </p>
        </div>

        <div v-if="panel" class="flex items-center justify-end space-x-4">
          <div class="flex items-center justify-center">
            <div class="p-3 rounded-l-md bg-slate-100 text-slate-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div class="p-1 pl-0 rounded-r-md bg-slate-100 text-slate-700">
              <input
                placeholder="I am looking for ..."
                class="
                  bg-white
                  p-0
                  m-0
                  h-[2.25rem]
                  rounded-md
                  px-2
                  text-sm
                  focus:outline-none
                  focus:ring
                  focus:ring-slate-300
                  focus:ring-inset
                "
                type="text"
              />
            </div>
          </div>

          <div class="flex items-center justify-center">
            <div class="p-3 text-sm text-white rounded-l-md bg-slate-800">
              Create
            </div>
            <div class="p-3 text-white rounded-r-md bg-slate-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="h-full p-4 py-6 text-base">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  middleware: ['loadConfig'],
  computed: {
    ...mapGetters('config', ['config', 'menuTree']),
  },
  data() {
    return {
      panel: null,
    }
  },
  watch: {
    $route() {
      this.updatePanel()
    },
  },
  methods: {
    updatePanel() {
      this.panel = this.$store.state.config.config.panels.find(
        (p: any) => p.id === this.$route.params.panelId
      )
    },
  },
  created() {
    this.updatePanel()
  },
  head() {
    return {
      title: this.config.theme.projectName + ' CMS',
    }
  },
})
</script>