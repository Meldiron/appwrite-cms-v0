---
description: Configure AppwriteCMS to fit your database.
---

# 🛠 Configuration

AppwriteCMS was made with simplicity in mind. The whole configuration of AppwriteCMS will be stored in one JSON file, and you dont need any programming experience to configure it. This JSON file was made to work almost always, making most of the configuration optional. You can follow the guide and gradually fill your config file, slowly seeing the process you are making.

First, you open `static` folder, create `config.json` file in there, and open it in your favourite text editor. It's a plus if the editor supports JSON format, as it can mark if you create some syntax error by mistake. I would personally recommend using [Visual Studio Code](https://code.visualstudio.com).

{% hint style="info" %}
You can check out an [example config.json](https://github.com/Meldiron/appwrite-cms/blob/master/static/dev\_config.json) I created for my own project with three collections: authors, articles, and news. The example config includes groups, dashboard, panels and bunch of different blocks, such as rich text, image, date or relationship dropdown.
{% endhint %}

Once opened, let's fill it with (for now) empty JSON:

{% code title="config.json" %}
```json
{
}
```
{% endcode %}

Now we need to fill the JSON file, don't we? The file is split into multiple sections and each of them is explained in its own documentation below.

### 'appwrite' section

This section includes information about the Appwrite instance to which AppwriteCMS will be connecting. We will need `endpoint` and `projectId` configured, for example:

```json
{
  "appwrite": {
    "endpoint": "https://demo.appwrite.io/v1",
    "projectId": "appwriteBlog"
  }
}
```

You can find these in `Settings` page of your Appwrite project. If configured properly, you will see this information in AppwriteCMS on the login page.

![Login page with 'appwrite' configuration](<../.gitbook/assets/CleanShot 2022-01-25 at 18.53.16.png>)

### 'theme' section

This section is used for personalizing the CMS. We can configure `projectName` and `projectIcon`, for example:

```json
{
  "theme": {
    "projectName": "Matej's Blog",
    "projectIcon": "🎁"
  }
}
```

![Login page with 'theme' configuration](<../.gitbook/assets/CleanShot 2022-01-25 at 18.53.21.png>)

![Homepage of editor with 'theme' configuration](<../.gitbook/assets/CleanShot 2022-01-25 at 18.55.12 (2).png>)

### 'settings' section

This section configures default values used by AppwriteCMS. We can specify multiple settings here:

* `limitOptions` is an array of numbers, saying what limit options will there be if nothing specific is configured on the specific panel

![Page limit dropdown](<../.gitbook/assets/CleanShot 2022-01-25 at 18.59.32.png>)

![Page limit dropdown uptions](<../.gitbook/assets/CleanShot 2022-01-25 at 18.59.51 (2).png>)

Example of settings section:

```json
{
  "settings": {
    "limitOptions": [5, 10, 25, 50, 100]
  }
}
```

### 'dashboard' section

This section holds the configuration of the first page that the editor sees after logging into CMS. Here you can have some quick action buttons, graphs with stats, or a summary of activity in 24 hours. Imagination is your limit, but if you are not a programmer, you will have to use existing components.

We can confiture `motd` and `blocks`:

```json
{
  "dashboard": {
    "motd": "Welcome to the CMS 👋",
    "blocks": [
      {
        "type": "PresentationDivider",
        "config": {
          "text": "We are working on the dashboard ...",
          "icon": "🔨"
        }
      }
    ]
  }
}
```

![Dasbboard with MOTD and a presentation component](<../.gitbook/assets/CleanShot 2022-01-25 at 18.58.30.png>)

To learn more about 'dashboard' components, visit [Dashboard Blocks](../components/dashboard-block.md) documentation.

### 'groups' section

This section allows you to create logical groups of your panels (collections). A Basic website usually only holds a few collections, but a large website can use dozen of collections. Since scrolling through 50 options in a menu would feel terrible, you can use groups to group similar collections together.

Groups section js a JSON object where the key is ID of your group, and value is the configuration of your group.  The group ID is never visible to the editor, but you should pick a reasonable name because you will refer to this group by its ID later when putting a panel under it. Every project can have multiple information configured:

* `name` is the name of a group visible to the editor.
* `icon` is a small emoji icon displayed near the name
* `menuSort` is a number explaining where exactly in the left menu should the group be placed. A higher number means it will be lower in the menu tree
* `isOpenedByDefault` is a boolean saying if this group should be opened by default when the editor visits the page
* `parentGroupId` can be used to configure the parent group of a group. This allows group nesting, and it is optional. If a group does not have a parent, it means, it is on a root level

Example of two fully configured groups:

```json
{
  "groups": {
    "marketing": {
      "name": "Marketing",
      "icon": "📖",
      "isOpenedByDefault": true,
      "menuSort": 10,
      "parentGroupId": null
    },
    "games": {
      "name": "Games",
      "icon": "🎮",
      "isOpenedByDefault": false,
      "menuSort": 15,
      "parentGroupId": null
    }
  },
}
```

![Categories in the left menu](<../.gitbook/assets/CleanShot 2022-01-25 at 18.57.29.png>)

### 'panels' section

This section provides configuration to all panels (pages) of our CMS and each panel maps one-to-one to each collection in your Appwrite database.

The panels section is a JSON object where the key is ID  the collection in Appwrite, and the value is a configuration of our panel. Every panel can have multiple information configured:

* `name` is the name of the panel visible to the editor
* `icon` is emoji icon of the collection displayed alongside the name
* `description` is a short description of the panel visible on top of the panel page

!['name', 'icon' and 'description' configured on panel](<../.gitbook/assets/CleanShot 2022-01-25 at 19.13.37.png>)

* `groupId` is string ID of a group to which this panel belongs. It can be omitted if the panel does not belong under any group

![Panels under a group](<../.gitbook/assets/CleanShot 2022-01-25 at 19.13.50.png>)

* `menuSort` number explaining where exactly in the left menu should the group be placed. A higher number means it will be lower in the menu tree
* `defaultLimit` number specifies which limit option should be picked by default when you visit the panel page. This number should be one of the limits provided in `limitOptions` under `settings` section
* `searchAttribute` string is an attribute key from Appwrite that will be used when searching using an input.

![Search input in a panel page](<../.gitbook/assets/CleanShot 2022-01-25 at 19.13.13.png>)

* `labels` object where the key is ID of the label (visible in the URL), and value being label configuration. The configuration includes `name` (visible to editor), `queries` and `sorts` configurations reflecting what Appwrite's [listDocuments](https://appwrite.io/docs/client/database?sdk=web-default#databaseListDocuments). To learn more, see example below.
* `hideAllRecordsLabel` boolean allows you to disable the default `All recods` label that shows all documents without any filters

![All records laber in panel page](<../.gitbook/assets/CleanShot 2022-01-25 at 19.12.51.png>)

* `canDeleteDocuments` boolean value letting you to choose if editors can delete existing records or not

![Delete record button](<../.gitbook/assets/CleanShot 2022-01-25 at 19.13.01.png>)

* `singleton` is a string value. If left empty, the panel is not treated as a singleton, and will properly show the list view. If we set singleton, the list view will be skipped and you will see the detail of the record when visiting the panel. The string should be set to the ID of the document that is a singleton in your collection. This option is really useful for panels like "settings" holding "contactEmail" since your website only needs one record for settings.
* `actions` object holding `create`, `list`, `edit` and `view` objects, each of them configuring different action.

Example of a panel with all properties configured except actions:

```json
{
  "panels": {
    "blogAuthors": {
      "name": "Authors",
      "icon": "👱‍♀️",
      "description": "Authors of articles. Not news!",
      "groupId": "marketing",
      "menuSort": 100,
      "searchAttribute": "name",
      "defaultLimit": 5,
      "canDeleteDocuments": true,
      "hideAllRecordsLabel": false,
      "labels": {
        "only-published": {
          "sorts": [],
          "queries": ["verified.equal(true)"],
          "name": "Only verified"
        },
        "only-drafts": {
          "sorts": [],
          "queries": ["type.equal(\"intern\")"],
          "name": "Only interns"
        }
      },
      
      "actions": {
        "view": {},
        "list": {},
        "edit": {},
        "create": {}
      }
    }
  }
}
```

Let's finish configuring panels by looking at how each action can be configured.

#### 'list' action configuration

List configuration explains what columns are there in the table when listing records. It needs to include array of `blocks`, each being object with the following keys:

* `name` of the column in the table
* `attribute` string of Appwrite's attribute key to which this block maps
* `type` string being type of the component
* `config` json object holding component configuration for the specific type
* `width` of the column in the table (maps to css style)

Example of list action:

```json
{
  "list": {
    "blocks": [
      {
        "name": "Appwrite ID",
        "width": "250px",
        "type": "ListStringValue",
        "attribute": "$id",
        "config": {}
      },
      {
        "name": "Photo",
        "type": "ListImageValue",
        "attribute": "photoFileId",
        "width": "85px",
        "config": {}
      },
      {
        "name": "Name",
        "type": "ListStringValue",
        "attribute": "name",
        "config": {}
      },
      {
        "name": "Bio",
        "type": "ListStringValue",
        "attribute": "bio",
        "config": {}
      }
    ]
  }
}
```

![List action configured](<../.gitbook/assets/CleanShot 2022-01-25 at 19.51.04.png>)

To learn more about 'list' components, visit [List Blocks](../components/list-block.md) documentation.

#### 'create' action configuration

Create configuration explains what inputs are there in the form when creating a new record. It needs to include an array of `blocks`, each being object with the following keys:

* `name` of the column in the table
* `attribute` string of Appwrite's attribute key to which this block maps
* `type` string being type of the component
* `config` json object holding component configuration for the specific type
* `note` small text visible just below the form section of this attribute
* `array` boolean specifying if this attribute is array or not

Example of list action:

```json
{
  "create": {
    "blocks": [
      {
        "type": "FormTextInput",
        "name": "Full name",
        "attribute": "name",
        "array": false,
        "config": {
          "placeholder": "Author name"
        }
      },
      {
        "type": "FormTextareaInput",
        "name": "About author",
        "note": "Short 1-2 sentence bio.",
        "attribute": "bio",
        "array": false,
        "config": {
          "placeholder": "I am ..."
        }
      },
      {
        "type": "FormImageInput",
        "name": "Profile photo",
        "note": "Square author picture",
        "attribute": "photoFileId",
        "array": false,
        "config": {}
      }
    ]
  }
}
```

![Create action configured](<../.gitbook/assets/CleanShot 2022-01-25 at 19.51.00.png>)

To learn more about 'create' components, visit [Form Blocks](../components/form-block.md) documentation.

#### 'edit' action configuration

Edit configuration explains what inputs are there in the form when editing an existing record. Its configuration allows exactly the same properties as 'create' action, but since most of the time you want the edit action to be exactly the same as create action, there is a handy shortcut. To tell edit action to copy create action, you can use `blocksReflectCreate` attribute:

```json
{
  "edit": {
    "blocksReflectCreate": true
  }
}
```

![Edit action configured](<../.gitbook/assets/CleanShot 2022-01-25 at 19.51.11.png>)

#### 'view' action configuration

View configuration explains what data are visible when displaying detail about one specific record. It needs to include an array of `blocks`, each being object with the following keys:

* `name` of the column in the table
* `attribute` string of Appwrite's attribute key to which this block maps
* `type` string being type of the component
* `config` json object holding component configuration for the specific type
* `note` small text visible just below the form section of this attribute
* `array` boolean specifying if this attribute is array or not

Example of view action:

```json
{
  "view": {
    "blocks": [
      {
        "type": "PresentationDivider",
        "attribute": null,
        "config": {
          "icon": "👱‍♀️",
          "text": "Author details"
        }
      },
      {
        "type": "DetailStringValue",
        "name": "Full name",
        "attribute": "name"
      },
      {
        "type": "DetailStringValue",
        "name": "About author",
        "attribute": "bio"
      },
      {
        "type": "DetailImageValue",
        "name": "Author picture",
        "attribute": "photoFileId"
      }
    ]
  }
}
```

![View action configured](<../.gitbook/assets/CleanShot 2022-01-25 at 19.51.23.png>)

To learn more about 'view' components, visit [Detail Blocks](../components/detail-block.md) documentation.
