import { ConfigType } from "../store/config";

export const Utils = {
    generateHead(config: ConfigType): any {

        const title = config.theme.projectName + ' | AppwriteCMS';
        const description = 'Prepare admin panels for your projects rapidly using AppwriteCMS, a headless CMS for any Appwrite project.';
        const cover = 'https://raw.githubusercontent.com/Meldiron/appwrite-cms/master/static/cover.png'

        return {
            title: title,
            meta: [
                { hid: 'og:title', name: 'og:title', content: title },
                { hid: 'description', name: 'description', content: description },
                // { hid: 'og:url', name: 'og:url', content: url },
                { hid: 'og:type', name: 'og:type', content: "website" },
                { hid: 'og:description', name: 'og:description', description },
                // { hid: 'og:image', name: 'og:image', content: cover },
                { hid: 'twitter:card', name: 'twitter:card', content: "summary_large_image" },
                // { hid: 'twitter:domain', name: 'twitter:domain', content: url.split("http://").join("").split("https://").join("").split("/").join("") },
                // { hid: 'twitter:url', name: 'twitter:url', content: url },
                { hid: 'twitter:title', name: 'twitter:title', content: title },
                { hid: 'twitter:description', name: 'twitter:description', content: description },
                { hid: 'twitter:image', name: 'twitter:image', content: cover },
            ]
        }
    }
}