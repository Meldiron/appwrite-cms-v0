<template>
  <div class="container mx-auto">
    <div
      class="
        relative
        w-full
        p-6
        pl-20
        overflow-hidden
        text-white
        border-2
        rounded-md
        bg-sky-500
        border-sky-500
      "
    >
      <div
        class="
          absolute
          top-0
          left-0
          flex
          items-center
          justify-center
          h-full
          transform
          translate-x-[-45%]
        "
      >
        <div
          class="
            flex
            items-center
            justify-center
            w-32
            h-32
            rounded-full
            bg-sky-600
            text-sky-500
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 ml-16"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <p class="ml-2">
        In future, you can expect your dashboard here! For now, this will serve
        as onboarding documentation.
      </p>
    </div>

    <div class="p-6 mt-6 bg-white rounded-md">
      <div class="prose" v-html="markdownToHtml()"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as Marked from 'marked'

declare const marked: any // Imported by nuxt as plugin

export default Vue.extend({
  layout: 'app',
  middleware: ['userOnly'],
  methods: {
    markdownToHtml() {
      return Marked.marked(this.markdown)
    },
  },
  data() {
    return {
      markdown: 'Loading...',
    }
  },
  async created() {
    this.markdown = await this.$axios.$get('/tutorial.md')
  },
})
</script>
