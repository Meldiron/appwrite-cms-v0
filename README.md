![Cover image](/static/cover.png)

_Documentation is hosted on [GitBook](https://meldiron-appwrite.gitbook.io/appwrite-cms/). Please refer to this website when looking for any guides._

# AppwriteCMS

Hey there 👋

Happy to see you here... Since you are looking for Appwrite admin panel, you already know what Appwrite is, right... Right?!?!

If for whatever reason you never heard about Appwrite, please check out their [Website](https://appwrite.io/) to learn more about Appwrite. Believe it or not, you can't use AppwriteCMS without Appwrite 😬

With that said...

AppwriteCMS is headless CMS for your Appwrite database. Appwrite allows you to manage your database, but the view is too developer-ish and allows zero customization. In the end, it is a tool for developer, not copywriter... That's where AppwriteCMS comes into play! Connect AppwriteCMS to any Appwrite project and configure it as much as you need. AppwriteCMS even allows you to write your own components to achieve any interface your project needs. You can learn more in our [official documentation](https://meldiron-appwrite.gitbook.io/appwrite-cms/).

Oh, I almost forgot...

I never liked when people miss-spell my name from Matej to Madžejč. Products feel the same! 🤖 Let's not offend them, okay?

The correct spelling is `Appwrite`, not `AppWrite`. Just like that, this is product is called `AppwriteCMS`, not `Apppwrite CMS`, and absolutely not `AppWrite CMS`.

Thanks for your attention open source community! See you later in GitHub issues section 👋

## Documentation

You can find bunch of resources on our official [GitBook](https://meldiron-appwrite.gitbook.io/appwrite-cms/) documentation.

## TODO

- Sort by attribute functionality
- Multiselect delete in list
- Array in list, somehow
- Relationship components
- Dashboard components (graphs, ...)
- Dark theme
- Responsibity
- Write GitBook docs
- Auth using email&password (custom cloud function)
- Offset pagination option
- Research cursor pagination (probably never before direction)
- TODOS in code

## Contributing

Fun fact, we are using Nuxt! 🥳 If you understand Vue, you are more than ready to start building components. If you don't, eh, you will figure it out 😅 Don't be scared, components are tiny HTML&CSS&JS snippets that only uses Vue to bind data between HTML an JavaScript.

All code contributions - including those of people having commit access - must go through a pull request and be approved by a core developer before being merged. This is to ensure a proper review of all the code.

We truly ❤️ pull requests! Refer to information below in order to understand how to setup&build the project and see how folder structore works.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

### Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

#### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

#### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

#### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

#### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

#### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

#### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

#### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
