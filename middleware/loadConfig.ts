import { Middleware } from '@nuxt/types'

const middleware: Middleware = async (context) => {
    if (!context.store.getters['config/config']) {
        await context.store.dispatch("config/load");
    }
}

export default middleware;