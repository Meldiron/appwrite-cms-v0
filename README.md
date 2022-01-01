![Cover image](/static/cover.png)

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/Meldiron/appwrite-cms">![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)</a>

# AppwriteCMS

Hey there 👋 This project is work in progress. I do not plan to finish it before Appwrite 0.12 release.

(intro)

## Setup

- Download ZIP from releases
- Upload to FTP (or whatever)
- Write config.json
- Configure appwrite
  - Editors team and proper permissions on collection&documents
  - Add platform
  - Custom domain on same root domain

## Usage

Read more at [tutorial document](static/tutorial.md).

## TODO

- If on edit page, "back" should go either to view or list.. Somehow.. you should know where...
- Currently we probably ignore enabled in actions in config
- List page
- Docs how to create new components (all 3 types)
- Searching
- Limiting
- List + paginating
- Labels
- TODOS in code
- Pouzi isLoading zo store aby si dal loading ikonku na action tlacidlo (save)

## Future update plan

- Dark theme
- Mobile responsivity
- Permission management (team owners&members)
- Modular auth&storage&data library to allow other backends

## Contributing

All code contributions - including those of people having commit access - must go through a pull request and be approved by a core developer before being merged. This is to ensure a proper review of all the code.

We truly ❤️ pull requests! Refer to information below in order to understand how to setup&build the project, see how folder structore works and what technologies we use.

### Build Setup

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
