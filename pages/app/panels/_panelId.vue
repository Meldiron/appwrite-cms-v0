<template>
  <div>
    <div class="flex items-center justify-start text-md">
      <button class="px-6 py-3 bg-slate-900 text-slate-50 rounded-l-md">
        All Records
      </button>
      <button class="px-6 py-3 bg-slate-200 text-slate-700">All Records</button>
      <button class="px-6 py-3 bg-slate-200 text-slate-700 rounded-r-md">
        All Records
      </button>
    </div>

    <table class="w-full mt-6 rounded-md shadow-md">
      <thead class="bg-slate-900">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-sm font-medium tracking-wider text-left  rounded-tl-md text-slate-100"
          ></th>
          <th
            scope="col"
            class="px-6 py-3 text-sm font-medium tracking-wider text-left  text-slate-100"
          >
            Name
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-sm font-medium tracking-wider text-left  rounded-tr-md text-slate-100"
          >
            Title
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white">
          <td>
            <div
              class="flex items-center justify-center w-6 h-6 m-2 text-white border-2 rounded-md  border-slate-800 bg-slate-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </td>
          <td
            class="px-6 py-4 font-medium  text-md whitespace-nowrap text-slate-900"
          >
            Cody Fisher
          </td>
          <td class="px-6 py-4 text-md whitespace-nowrap text-slate-500">
            Product Directives Officer
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex items-center justify-center w-full mt-6">
      <button class="w-40 px-8 py-2 bg-slate-200 text-slate-900 rounded-l-md">
        Previous
      </button>

      <button class="w-40 px-8 py-2 text-white bg-slate-900 rounded-r-md">
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'app',
  middleware: ['userOnly'],

  data() {
    const panel = this.$store.state.config.config.panels.find(
      (p: any) => p.id === this.$route.params.panelId
    )

    return {
      panel: panel || null,
    }
  },
})
</script>