<template>
  <div
    v-bind:class="level === 1 ? '' : 'pt-0'"
    class="flex flex-col h-full py-1 space-y-2 overflow-y-auto text-sm"
  >
    <nuxt-link
      :event="menuElement.isCategory ? '' : 'click'"
      :to="'/app/panels/' + menuElement.id"
      v-for="menuElement in menuTree"
      :key="menuElement.id"
      class="flex flex-col space-y-3"
      v-bind:class="
        menuElement.isCategoryOpened ? '' : 'max-h-[3rem] overflow-y-hidden'
      "
    >
      <div
        @click="onToggleCategory($event, menuElement)"
        class="relative flex items-center justify-start p-3 px-3 space-x-3 rounded-md  group menu-button text-slate-300"
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center justify-start space-x-3">
            <div class="flex items-center justify-start space-x-2">
              <div
                v-if="level !== 1"
                class="absolute left-0 w-3 h-4 transform -translate-y-2 border-b-2 border-l-2  tree-indicator rounded-bl-md border-slate-600"
              ></div>
              <span class="text-sm" v-if="menuElement.icon">
                {{ menuElement.icon }}
              </span>
            </div>
            <p class="text-sm font-light uppercase group-hover:underline">
              {{ menuElement.title }}
            </p>
          </div>

          <svg
            v-if="menuElement.isCategory"
            xmlns="http://www.w3.org/2000/svg"
            v-bind:class="
              menuElement.isCategoryOpened ? ['transform rotate-180'] : []
            "
            class="w-5 h-5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <div v-if="menuElement.children.length > 0" class="ml-5">
        <coreMenuTree :level="level + 1" :menuTree="menuElement.children" />
      </div>

      <div v-if="menuElement.children.length <= 0" class="ml-5">
        <p class="font-light text-slate-600">This category is empty</p>
      </div>
    </nuxt-link>

    <p
      v-if="Object.keys(menuTree).length <= 0"
      class="font-light text-slate-600"
    >
      No panels found
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MenuTreeType } from '~/store/config'
export default Vue.extend({
  props: ['menuTree', 'level'],
  methods: {
    onToggleCategory(event: Event, category: MenuTreeType[number]) {
      if (!category.isCategory) {
        return
      }

      this.$store.dispatch('config/toggleCategory', category.id)
      event.stopPropagation()
      event.preventDefault()
    },
  },
})
</script>

<style scoped>
.nuxt-link-active .menu-button {
  @apply bg-white text-slate-900;
}

.nuxt-link-active .tree-indicator {
  @apply hidden;
}
</style>