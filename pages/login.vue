<template>
  <div
    class="flex items-center justify-center w-screen h-screen overflow-y-auto  from-slate-900 via-slate-900 to-black bg-gradient-to-b"
  >
    <div
      class="container flex flex-col items-center justify-center mx-auto space-y-4 "
    >
      <div
        class="relative w-full max-w-lg p-8 pb-2 bg-white rounded-md  text-slate-900"
      >
        <div class="absolute left-0 flex justify-center w-full -top-12">
          <div
            class="
              justify-center
              flex
              items-center
              text-[60px]
              bg-slate-50
              shadow-md
              border-8
              w-28
              h-28
              rounded-xl
              border-white
            "
          >
            {{ config.theme.projectIcon }}
          </div>
        </div>

        <div class="mt-14">
          <h1 class="text-3xl font-semibold text-center text-black">
            {{ config.theme.projectName }}
          </h1>

          <form
            autocomplete="on"
            id="loginform"
            action="/login"
            method="GET"
            v-on:submit.prevent="onLogin($event)"
            class="flex flex-col my-8 space-y-4"
          >
            <input
              id="username"
              autocomplete="username"
              name="username"
              type="text"
              value="apiKey"
              class="hidden"
            />
            <input
              name="current-password"
              autocomplete="current-password"
              id="current-password"
              v-model="apiKey"
              class="p-4 bg-white border-4 rounded-md  border-slate-200 focus:outline-none focus:ring ring-gray-600"
              type="password"
              placeholder="Project API Key"
            />
            <button
              type="submit"
              class="flex items-center justify-center p-4 space-x-3 text-lg font-semibold border-4 rounded-md  bg-slate-900 text-slate-50 border-slate-900 focus:outline-none focus:ring ring-gray-600"
            >
              <span>Login</span>

              <svg
                v-if="isLoading"
                class="w-6 h-6 animate-spin"
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

            <div
              class="flex flex-col items-center pt-4 space-y-1 text-xs  text-slate-300"
            >
              <a
                class="hover:underline"
                target="blank"
                :href="
                  config.appwrite.endpoint.split('/v1').join('/') +
                  'console/home?project=' +
                  config.appwrite.projectId
                "
              >
                {{ config.appwrite.endpoint }}
              </a>
              <p>{{ config.appwrite.projectId }}</p>
            </div>
          </form>
        </div>
      </div>

      <div class="text-center text-slate-600">
        <p>
          Copyright © 2021
          <a
            href="https://github.com/Meldiron/appwrite-cms"
            class="text-slate-300 hover:underline"
            target="_blank"
            >AppwriteCMS</a
          >
          v{{ version }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { AppwriteService } from '~/services/appwrite'

export default Vue.extend({
  data() {
    return {
      version: process.env.APPVERSION,
      apiKey: '',
      isLoading: false,
    }
  },
  methods: {
    async onLogin(e: any) {
      if (this.isLoading) {
        return
      }

      this.isLoading = true

      const isSuccessful = await AppwriteService.login(this.apiKey)
      if (isSuccessful) {
        this.$router.push('/app')
      }

      this.isLoading = false
    },
  },
  middleware: ['loadConfig', 'guestOnly'],
  computed: {
    ...mapGetters('config', ['config', 'menuTree']),
  },
})
</script>