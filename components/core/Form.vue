<template>
  <form
    v-on:submit.prevent="SET_ACTION(this.action)"
    class="flex flex-col max-w-2xl space-y-6"
  >
    <div :key="blockIndex" v-for="(block, blockIndex) in blocks">
      <div v-if="block.array === false">
        <h1 v-if="block.name" class="mb-1 text-sm font-light text-slate-900">
          {{ block.name }}
        </h1>

        <component
          :ref="refPrefix + blockIndex"
          v-bind:is="'Blocks' + block.type"
          :document="document"
          :documentValue="document ? document[block.attribute] : undefined"
          :config="block.config"
          :appwrite="appwrite"
        ></component>

        <p
          class="mt-1 text-sm italic font-light text-slate-400"
          v-if="block.note"
        >
          {{ block.note }}
        </p>
      </div>

      <div class="relative" v-if="block.array === true">
        <div class="absolute top-0 h-full -left-3">
          <div class="w-1 h-full rounded-full bg-slate-100"></div>
        </div>

        <h1 v-if="block.name" class="mb-1 text-sm font-light text-slate-900">
          {{ block.name }}
        </h1>

        <div
          class="flex flex-col mb-2 space-y-2"
          v-if="arrayBlocks['a' + blockIndex].length > 0"
        >
          <div
            v-for="(arrayBlock, arrayIndex) in arrayBlocks['a' + blockIndex]"
            :key="arrayBlock.key"
            class="flex items-center justify-center space-x-2"
          >
            <component
              class="flex-grow-0 w-full"
              :ref="refPrefix + blockIndex + ',' + arrayIndex"
              v-bind:is="'Blocks' + block.type"
              :config="block.config"
              :document="document"
              :documentValue="arrayBlock.val"
              :appwrite="appwrite"
            ></component>

            <button
              @click="onRemoveArray(blockIndex, arrayIndex)"
              type="button"
              class="p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <button
          @click="onAddArray(blockIndex)"
          type="button"
          class="px-6 py-2 text-sm rounded-md  bg-slate-200 text-slate-900 hover:bg-slate-300"
        >
          Add
        </button>

        <p
          class="mt-1 text-sm italic font-light text-slate-400"
          v-if="block.note"
        >
          {{ block.note }}
        </p>
      </div>
    </div>

    <button type="submit" class="hidden">Hidden submit button</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { AppwriteService } from '~/services/appwrite'
import { mapActions, mapGetters, mapMutations } from 'vuex'

let incrementingIndex = 0

export default Vue.extend({
  props: ['action', 'blocks', 'refPrefix', 'document'],
  data() {
    const arrayBlocks: any = {}

    for (let i = 0; i < this.blocks.length; i++) {
      const block = this.blocks[i]
      if (block.array) {
        if (!this.document) {
          arrayBlocks['a' + i] = [
            { key: Date.now() + '_' + incrementingIndex, val: undefined },
          ]
          incrementingIndex++
        } else {
          arrayBlocks['a' + i] = this.document[block.attribute].map(
            (val: any) => {
              const k = Date.now() + '_' + incrementingIndex
              incrementingIndex++

              return {
                val,
                key: k,
              }
            }
          )
        }
      }
    }

    return {
      appwrite: AppwriteService,
      arrayBlocks,
    }
  },
  watch: {
    GET_OMITTER: {
      handler(newAction) {
        if (newAction === this.action) {
          this.onSubmit()
        }
      },
    },
  },

  computed: {
    ...mapGetters('headerActions', ['GET_OMITTER']),
  },

  methods: {
    ...mapActions('headerActions', ['SET_ACTION']),
    ...mapMutations('headerActions', ['SET_LOADING']),
    async onSubmit() {
      this.SET_LOADING(true)

      let document: any = {}

      let i = 0
      for (const block of this.blocks) {
        if (block.array) {
          let componentArrayIndex = 0
          let component: any =
            this.$refs[this.refPrefix + i + ',' + componentArrayIndex]

          let appendMethods = []

          while (component) {
            try {
              appendMethods.push(component[0].$output)
            } catch (err) {
              // I dont care. Incorrect component implementation
            }

            componentArrayIndex++
            component =
              this.$refs[this.refPrefix + i + ',' + componentArrayIndex]
          }

          const docArrayVal = []
          for (let appendMethod of appendMethods) {
            docArrayVal.push(await appendMethod())
          }

          document[block.attribute] = docArrayVal
        } else {
          const component = this.$refs[this.refPrefix + i]
          let appendMethod = undefined

          try {
            // @ts-ignore
            appendMethod = component[0].$output
          } catch (err) {
            // I dont care. Incorrect component implementation
          }

          if (appendMethod) {
            document[block.attribute] = await appendMethod()
          }
        }

        i++
      }

      // @ts-ignore
      await this.$parent.onSubmit(document)

      this.SET_LOADING(false)
    },
    onAddArray(blockIndex: number) {
      this.arrayBlocks['a' + blockIndex].push({
        key: Date.now() + '_' + incrementingIndex,
        val: undefined,
      })

      incrementingIndex++
    },
    onRemoveArray(blockIndex: number, itemIndex: number) {
      this.arrayBlocks['a' + blockIndex] = this.arrayBlocks[
        'a' + blockIndex
      ].filter((_val: any, i: number) => i !== itemIndex)
    },
  },
})
</script>