---
description: Since it works fine, let's put it online!
---

# 🚀 Deployment

AppwriteCMS is a Nuxt application that can be easily built into a set of HTML, CSS and JavaScript files. Once you have these files, all you need to do is to serve them on a domain for your content managers.

Build process for different hosting providers is properly documented on their subpages. If your provider is listed in the left menu under the deployment section, please switch to it and follow the instructions. If your provider is not listed, you can check out the manual building process and figure out how this can be done in your provider.

### 🏗 Manual build

To begin, we need to make sure we have all dependencies of our Nuxt project installed. If you haven't done it before, make sure to run the following command:

```bash
$ yarn -D
```

Once you have dependencies installed, you can build the project. The building process will take care of the pre-generation of your HTML pages, as well as preparing JavaScript files that take care of all functionality after the page is loaded. To build the project, you run the command below:

```
$ yarn generate
```

{% hint style="info" %}
Currently, you cannot build the project on Windows machines. Please use Linux, macOS, or any cloud provider that takes care of building for you.
{% endhint %}

When the generation is finished, you will have your files ready in the `dist` folder. All you need to do now is to move files from the `dist` folder to your web hosting, so it starts providing your files to visitors of your website.

{% hint style="warning" %}
This section would love some more work! No one is perfect and we don't know all web hostings our there. If you managed to deploy AppwriteCMS to your favourite hosting and it is not on this list, please consider updating this page for developers in the future. This project has been given to you for free and this might be the best way for you to give back to the open source community.
{% endhint %}
