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
      <nuxt-link
        to="/app"
        class="flex items-center w-full p-3 space-x-3 text-white shadow-md  bg-slate-800"
      >
        <div
          class="flex items-center justify-center w-12 h-12 rounded-md  bg-slate-100 text-slate-600"
        >
          {{ config.theme.projectLogo | '🤖' }}
        </div>

        <div
          class="flex-1 w-20 overflow-x-hidden text-lg font-semibold  whitespace-nowrap"
        >
          <p class="text-ellipsis">{{ config.theme.projectName }}</p>
        </div>
      </nuxt-link>

      <div class="h-full p-3 overflow-y-auto">
        <coreMenuTree :menuTree="menuTree" :level="1" />
      </div>

      <div class="p-3">
        <button
          @click="onLogout()"
          class="flex items-center justify-center w-full p-3 space-x-3 text-center text-red-500 rounded-lg  bg-slate-900"
        >
          <span> Logout </span>

          <svg
            v-if="isLoggingOut"
            class="w-5 h-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <div
      class="w-full h-full overflow-y-auto  from-slate-100 to-slate-50 bg-gradient-to-b"
    >
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

      <div class="p-8 text-base">
        <Nuxt />
      </div>

      <div
        class="flex items-center justify-between p-4 bg-black text-slate-400"
      >
        <p>
          Made with <span class="text-red-500">❤️</span>&nbsp; by
          <a
            class="text-white hover:underline"
            target="_blank"
            href="https://github.com/Meldiron"
            >Meldiron</a
          >
        </p>

        <p>
          Copyright © 2021
          <a
            href="https://github.com/Meldiron/appwrite-cms"
            class="text-white hover:underline"
            target="_blank"
            >AppwriteCMS</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { AppwriteService } from '~/services/appwrite'
import { Utils } from '../services/utils'

export default Vue.extend({
  middleware: ['loadConfig'],
  computed: {
    ...mapGetters('config', ['config', 'menuTree']),
  },
  data() {
    return {
      panel: null,
      isLoggingOut: false,
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
    async onLogout() {
      this.isLoggingOut = true

      const isSuccessful = await AppwriteService.logout()
      if (isSuccessful) {
        this.$router.push('/login')
      }

      this.isLoggingOut = false
    },
  },
  created() {
    this.updatePanel()
  },
  head() {
    return Utils.generateHead(this.config)
  },
})
</script>