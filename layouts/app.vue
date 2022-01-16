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
        class="flex items-center w-full p-3 space-x-3 text-white shadow-md  group bg-slate-800"
      >
        <div
          class="flex items-center justify-center w-12 h-12 text-center text-white rounded-md  bg-slate-900"
        >
          {{ config.theme.projectIcon }}
        </div>

        <div
          class="flex-1 w-20 overflow-x-hidden text-lg font-semibold  whitespace-nowrap"
        >
          <p class="group-hover:underline text-ellipsis">
            {{ config.theme.projectName }}
          </p>
        </div>
      </nuxt-link>

      <div class="h-full p-3 overflow-y-auto">
        <coreMenuTree :menuTree="menuTree" :level="1" />
      </div>

      <div class="p-3">
        <button
          @click="onLogout()"
          class="flex items-center justify-center w-full p-3 space-x-3 text-center text-red-500 border-2 rounded-lg  border-slate-900 hover:bg-black bg-slate-900"
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
            <span
              v-if="getCurrentPageName(pageType) !== null"
              class="text-slate-400"
              >- {{ getCurrentPageName(pageType) }}</span
            >
          </h1>
          <p v-if="panel.description" class="text-sm text-slate-500">
            {{ panel.description }}
          </p>
        </div>
        <div v-if="!panel">
          <h1 class="text-xl font-semibold text-slate-900">👋 Welcome</h1>
          <p class="text-sm text-slate-500">
            Glad to see you. Happy administrating!
          </p>
        </div>

        <div
          v-if="panel && pageType === 'list'"
          class="flex items-center justify-end space-x-4"
        >
          <div
            v-if="panel.searchAttribute"
            class="flex items-center justify-center group"
          >
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
                @change="onChangeSearch"
                v-model="searchText"
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

          <nuxt-link
            :to="'/app/panels/' + panelId + '/create'"
            v-if="isEnabled(panel.actions.create)"
            class="flex items-center justify-center group"
          >
            <div
              class="p-3 text-sm text-white  rounded-l-md bg-slate-800 group-hover:bg-slate-900"
            >
              Create
            </div>
            <div
              class="p-3 text-white  group-hover:bg-black rounded-r-md bg-slate-900"
            >
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
          </nuxt-link>
        </div>

        <div
          v-if="panel && pageType === 'create'"
          class="flex items-center justify-end space-x-4"
        >
          <nuxt-link
            :to="'/app/panels/' + panelId"
            class="flex items-center justify-center group"
          >
            <div
              class="p-3 text-sm  text-slate-800 rounded-l-md group-hover:bg-slate-200 bg-slate-100"
            >
              Discard
            </div>
            <div
              class="p-3  text-slate-800 rounded-r-md group-hover:bg-slate-300 bg-slate-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </nuxt-link>

          <button
            type="button"
            @click="SET_ACTION('onCreateSave')"
            class="flex items-center justify-center group"
          >
            <div
              class="p-3 text-sm text-white  group-hover:bg-slate-900 rounded-l-md bg-slate-800"
            >
              Save
            </div>
            <div
              class="p-3 text-white  group-hover:bg-black rounded-r-md bg-slate-900"
            >
              <svg
                v-if="!GET_IS_LOADING"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"
                />
                <path
                  d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"
                />
                <path
                  d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"
                />
              </svg>

              <svg
                v-if="GET_IS_LOADING"
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
            </div>
          </button>
        </div>

        <div
          v-if="panel && pageType === 'edit'"
          class="flex items-center justify-end space-x-4 group"
        >
          <nuxt-link
            :to="'/app/panels/' + panelId"
            class="flex items-center justify-center"
          >
            <div
              class="p-3 text-sm  text-slate-800 group-hover:bg-slate-200 rounded-l-md bg-slate-100"
            >
              Discard
            </div>
            <div
              class="p-3  text-slate-800 rounded-r-md group-hover:bg-slate-300 bg-slate-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </nuxt-link>

          <button
            type="button"
            @click="SET_ACTION('onEditSave')"
            class="flex items-center justify-center group"
          >
            <div
              class="p-3 text-sm text-white  group-hover:bg-slate-900 rounded-l-md bg-slate-800"
            >
              Save
            </div>
            <div
              class="p-3 text-white  group-hover:bg-black rounded-r-md bg-slate-900"
            >
              <svg
                v-if="!GET_IS_LOADING"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"
                />
                <path
                  d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"
                />
                <path
                  d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"
                />
              </svg>

              <svg
                v-if="GET_IS_LOADING"
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
            </div>
          </button>
        </div>

        <div
          v-if="panel && pageType === 'view'"
          class="flex items-center justify-end space-x-4"
        >
          <nuxt-link
            v-if="!panel.singleton"
            :to="'/app/panels/' + panelId"
            class="flex items-center justify-center group"
          >
            <div
              class="p-3 text-sm  text-slate-800 rounded-l-md group-hover:bg-slate-200 bg-slate-100"
            >
              Close
            </div>
            <div
              class="p-3  text-slate-800 rounded-r-md group-hover:bg-slate-300 bg-slate-200"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </nuxt-link>

          <nuxt-link
            v-if="isEnabled(panel.actions.edit)"
            :to="'/app/panels/' + panelId + '/' + documentId + '/edit'"
            class="flex items-center justify-center group"
          >
            <div
              class="p-3 text-sm text-white  group-hover:bg-slate-900 rounded-l-md bg-slate-800"
            >
              Edit
            </div>
            <div
              class="p-3 text-white  rounded-r-md group-hover:bg-black bg-slate-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                />
              </svg>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div class="p-8 text-base">
        <Nuxt />
      </div>

      <!-- <div
        v-if="pageType === 'homepage'"
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
          v{{ version }}
        </p>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { AppwriteService } from '~/services/appwrite'
import { Utils } from '../services/utils'

export default Vue.extend({
  middleware: ['loadConfig'],
  computed: {
    ...mapGetters('config', ['config', 'menuTree']),
    ...mapGetters('headerActions', ['GET_IS_LOADING']),
  },
  data() {
    return {
      version: process.env.APPVERSION,
      panel: null as any,
      isLoggingOut: false,
      pageType: 'list',
      documentId: null as null | string,
      panelId: null as null | string,
      searchText: '',
    }
  },
  watch: {
    $route() {
      this.updatePanel()
    },
  },
  methods: {
    async onChangeSearch() {
      if (!this.panel) {
        return
      }

      const searchTerm = this.searchText
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, search: searchTerm },
      })
    },
    ...mapActions('headerActions', ['SET_ACTION']),
    getCurrentPageName(pageType: string) {
      if (pageType === 'homepage') {
        return null
      }
      if (pageType === 'list') {
        return 'Listing documents'
      }
      if (pageType === 'create') {
        return 'Creating a document'
      }
      if (pageType === 'view') {
        return 'Viewing a document'
      }
      if (pageType === 'edit') {
        return 'Editing a document'
      }

      return null
    },
    isEnabled(obj: any) {
      return obj.blocks && obj.blocks.length > 0
    },
    updatePanel() {
      this.searchText = this.$route.query.search || ''
      this.documentId = this.$route.params.documentId || null
      this.panelId = this.$route.params.panelId
      this.panel =
        this.$store.state.config.config.panels[this.$route.params.panelId]

      this.pageType = 'none'

      if (this.$route.path === '/app') {
        this.pageType = 'homepage'
      }

      if (this.panelId && this.$route.path === '/app/panels/' + this.panelId) {
        this.pageType = 'list'
      }

      if (
        this.panelId &&
        this.$route.path === '/app/panels/' + this.panelId + '/create'
      ) {
        this.pageType = 'create'
      }

      if (
        this.panelId &&
        this.documentId &&
        this.$route.path ===
          '/app/panels/' + this.panelId + '/' + this.documentId + '/view'
      ) {
        this.pageType = 'view'
      }

      if (
        this.panelId &&
        this.documentId &&
        this.$route.path ===
          '/app/panels/' + this.panelId + '/' + this.documentId + '/edit'
      ) {
        this.pageType = 'edit'
      }
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