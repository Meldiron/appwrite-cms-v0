<template>
  <div>
    <div class="w-full text-md">
      <div
        class="
          flex
          w-[fit-content]
          overflow-x-auto
          border-2
          rounded-md
          border-slate-900
          bg-slate-900
          flex-nowrap
        "
      >
        <button
          @click="onGoToLabel(labelId)"
          v-for="(label, labelId, labelIndex) in panel.labels"
          :key="labelId"
          v-bind:class="[
            labelIndex === Object.keys(panel.labels).length - 1
              ? ''
              : 'border-r-2',

            isLabelActive(labelId)
              ? 'bg-slate-900 text-slate-50 hover:bg-black'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900',
          ]"
          class="flex-shrink-0 px-6 py-3 border-slate-300"
        >
          {{ label.name }}
        </button>
      </div>
    </div>

    <div class="mt-3">
      <p class="mb-2 text-sm text-right text-slate-500" v-if="documents">
        {{ documentsSum === 5000 ? documentsSum + '+' : documentsSum }}
        {{ documentsSum === 1 ? 'document' : 'documents' }} found
      </p>
      <div
        class="overflow-y-auto border-2 rounded-md  bg-slate-900 border-slate-900"
      >
        <table
          class="relative w-full overflow-hidden border-collapse table-fixed"
        >
          <thead class="border-b-2 border-slate-800">
            <tr>
              <td
                class="
                  border-r-2 border-slate-800
                  bg-slate-900
                  py-2
                  px-4
                  text-white
                  font-semibold
                  w-[130px]
                "
              >
                Actions
              </td>

              <td
                v-bind:style="{
                  width: block.width,
                }"
                v-for="(block, blockIndex) of panel.actions.list.blocks"
                :key="blockIndex"
                class="px-4 py-2 font-semibold text-white border-r-2  border-slate-800 bg-slate-900"
              >
                {{ block.name }}
              </td>
            </tr>
          </thead>
          <tbody v-if="documents">
            <tr
              :key="document.$id"
              v-for="(document, documentIndex) of documents"
              v-bind:class="
                documentIndex % 2 === 0 ? 'bg-white' : 'bg-slate-100'
              "
            >
              <td class="flex items-center justify-start px-4 py-4 space-x-1">
                <nuxt-link
                  v-if="panel.actions.view.blocks.length > 0"
                  :to="'/app/panels/' + panelId + '/' + document.$id + '/view'"
                  ><button
                    class="p-2 rounded-md  bg-slate-200 text-slate-800 hover:bg-slate-300 hover:text-black"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fill-rule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clip-rule="evenodd"
                      />
                    </svg></button
                ></nuxt-link>

                <nuxt-link
                  v-if="panel.actions.edit.blocks.length > 0"
                  :to="'/app/panels/' + panelId + '/' + document.$id + '/edit'"
                >
                  <button
                    class="p-2 rounded-md  bg-slate-900 text-slate-50 hover:bg-black hover:text-slate-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                      />
                    </svg></button
                ></nuxt-link>

                <button
                  v-if="panel.canDeleteDocuments"
                  @click="onDeleteDocument(document)"
                  class="p-2 text-red-800 bg-red-200 rounded-md  hover:bg-red-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </td>
              <td
                v-for="(block, blockIndex) of panel.actions.list.blocks"
                :key="blockIndex"
                class="px-4 py-4"
              >
                <component
                  v-bind:is="'Blocks' + block.type"
                  :config="block.config"
                  :document="document"
                  :documentValue="document[block.attribute]"
                  :appwrite="appwrite"
                ></component>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex items-start justify-between mt-6">
      <div class="flex items-center justify-start space-x-2">
        <p class="text-sm text-slate-500">Documents per page</p>

        <select
          v-model="currentlySelectedLimit"
          class="px-2 bg-white border-2 rounded-md  focus:outline-none focus:ring ring-slate-500 border-slate-300"
        >
          <option
            :key="option"
            v-for="option of $store.state.config.config.settings.limitOptions"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>

      <div class="overflow-hidden rounded-md">
        <div class="flex items-end justify-center">
          <button
            @click="onChangePage('before')"
            v-bind:class="
              hasPrevious
                ? 'text-white bg-slate-900 hover:bg-black hover:text-slate-200'
                : 'bg-slate-200 text-slate-900'
            "
            class="w-40 px-8 py-2 border-r-2 border-slate-300"
          >
            Previous
          </button>

          <button
            @click="onChangePage('after')"
            v-bind:class="
              hasNext
                ? 'text-white bg-slate-900 hover:bg-black hover:text-slate-200'
                : 'bg-slate-200 text-slate-900'
            "
            class="w-40 px-8 py-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '~/services/appwrite'
export default Vue.extend({
  layout: 'app',
  middleware: ['userOnly'],

  watch: {
    $route() {
      this.updatePanel()
    },
    currentlySelectedLimit() {
      this.updatePanel()
    },
  },

  created() {
    this.updatePanel()
  },

  methods: {
    async onDeleteDocument(document: any) {
      if (!this.panelId) {
        return
      }

      if (confirm('Are you sure you want to delete this document?')) {
        await AppwriteService._db().deleteDocument(this.panelId, document.$id)
        this.updatePanel()
      }
    },
    async onChangePage(direction: string) {
      this.cursorDirection = direction
      this.cursor =
        direction === 'after'
          ? this.documents[this.documents.length - 1].$id
          : this.documents[0].$id

      await this.getCurrentPage()
    },
    async getCurrentPage() {
      if (!this.panelId) {
        return
      }

      const documentsBackup = [...this.documents]

      const orderAttributes: string[] = []
      const orderTypes: string[] = []

      if (this.label) {
        for (const orderKey in this.label.sorts) {
          orderAttributes.push(orderKey)
          orderTypes.push(this.label.sorts[orderKey])
        }
      }

      const queries = this.label ? [...this.label.queries] : []

      if (this.searchText) {
        const queryConfig = this.panel.searchAttribute
        queries.push(`${queryConfig}.search('${this.searchText}')`)
      }

      const appwriteResponse = await AppwriteService._db().listDocuments(
        this.panelId,
        queries,
        this.currentlySelectedLimit + 1,
        undefined,
        this.cursor,
        this.cursorDirection,
        orderAttributes,
        orderTypes
      )

      this.documentsSum = appwriteResponse.sum

      if (this.cursorDirection === 'after') {
        this.hasPrevious = this.cursor ? true : false
        this.hasNext =
          appwriteResponse.documents.length > this.currentlySelectedLimit
      } else {
        this.hasNext = this.cursor ? true : false
        this.hasPrevious =
          appwriteResponse.documents.length > this.currentlySelectedLimit
      }

      if (appwriteResponse.documents.length <= this.currentlySelectedLimit) {
        this.documents = appwriteResponse.documents

        if (this.cursorDirection === 'after') {
          this.hasNext = false
        } else {
          this.hasPrevious = false
        }
      } else {
        this.documents = appwriteResponse.documents.filter((d, dIndex) => {
          if (this.cursorDirection === 'after') {
            return dIndex < appwriteResponse.documents.length - 1
          } else {
            return dIndex !== 0
          }
        })
      }

      if (this.documents.length < 1) {
        if (this.cursorDirection === 'after') {
          this.hasNext = false
        } else {
          this.hasPrevious = false
        }

        this.documents = documentsBackup
      }
    },
    isLabelActive(labelId: string) {
      return this.labelId === labelId
    },
    async updatePanel() {
      this.panelId = this.$route.params.panelId
      this.panel = this.$store.state.config.config.panels[this.panelId]

      if (this.panel.singleton) {
        this.$router.push(
          `/app/panels/${this.panelId}/${this.panel.singleton}/view`
        )

        return
      }

      this.searchText = (this.$route.query.search as string) || null
      if (!this.currentlySelectedLimit) {
        this.currentlySelectedLimit = this.panel.defaultLimit
      }

      this.labelId = (this.$route.query.labelId || null) as null | string
      if (this.labelId) {
        this.label = this.panel.labels[this.labelId]
      } else {
        const firstLabelId = Object.keys(this.panel.labels)[0]
        this.$router.push({
          path: this.$route.path,
          query: { ...this.$route.query, labelId: firstLabelId },
        })
      }

      await this.getCurrentPage()
    },
    onGoToLabel(labelId: string) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, labelId: labelId },
      })
    },
  },

  data() {
    return {
      currentlySelectedLimit: 0,
      panel: null as any | null,
      label: null as any | null,
      labelId: null as null | string,
      panelId: null as null | string,
      searchText: null as null | string,
      documents: [] as any[],
      hasPrevious: false,
      hasNext: false,
      appwrite: AppwriteService,
      documentsSum: 0,

      cursor: undefined as undefined | string,
      cursorDirection: 'after' as string,
    }
  },
})
</script>