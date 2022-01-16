import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { AppwriteService } from '~/services/appwrite';

export type ConfigType = {
    appwrite: {
        endpoint: string;
        projectId: string;
    },
    dashboard: {
        motd: string;
        blocks: {
            type: string;
            config: any;
        }[]
    },
    settings: {
        permissionOptions: {
            // TODO: Use permissionOptions
            name: string;
            read: string[];
            write: string[];
        }[]; // Optional
        limitOptions: number[]; // Optional
    },
    theme: {
        projectName: string, // Optional
        projectIcon: string // Optional
    },
    groups: {
        [groupId: string]: {
            name: string,
            id: string, // Set automatically
            parentGroupId: string | null, // Optional, null means root level
            icon: string | null, // Optional
            menuSort: number, // Optional
            isOpenedByDefault: boolean // Optional
        }
    },
    panels: {
        [panelId: string]: {
            singleton: string | null,
            name: string,
            id: string, // Set automatically
            groupId: string | null, // Optional, null means no group
            icon: string | null, // Optional
            description: string | null, // Optional
            menuSort: number, // Optional
            searchAttribute: string, // Optional, empty array means search disabled
            // TODO: SearchAttribute(s) might be array in future, as soon as Appwrite supports it
            defaultLimit: number, // Optional
            hideAllRecordsLabel: boolean, // Optional
            canDeleteDocuments: boolean, // Optional
            labels: {
                [labelId: string]: {
                    id: string, // Set automatically
                    name: string,
                    queries: string[], // Optional
                    sorts: { // Optional
                        [attributeKey: string]: 'ASC' | 'DESC'
                    } | undefined
                }
            },

            actions: {
                edit: {
                    blocksReflectCreate: boolean, // Optional
                    blocks: {
                        note: string;
                        name: string;
                        attribute: string;
                        array: boolean;
                        type: string;
                        config: any;
                    }[]
                },
                create: {
                    blocks: {
                        note: string;
                        name: string;
                        attribute: string;
                        array: boolean;
                        type: string;
                        config: any;
                    }[]
                },
                list: {
                    blocks: {
                        // TODO: List array
                        width: number; // In pixels
                        name: string;
                        type: string;
                        config: any;
                        attribute: string;
                    }[]
                },
                view: {
                    blocks: {
                        note: string;
                        name: string;
                        attribute: string;
                        array: boolean;
                        type: string;
                        config: any;
                    }[]
                }
            }
        }
    }
}

export type MenuTreeType =
    {
        isCategoryOpened: boolean;
        isCategory: boolean;
        id: string;
        children: MenuTreeType;
        title: string;
        icon: string;
    }[];


export type ConfigStore = {
    config: null | ConfigType,
    menuTree: null | MenuTreeType
};

type StateCallback = () => ConfigStore;

export const state: StateCallback = () => ({
    config: null,
    menuTree: null
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    config: state => state.config,
    menuTree: (state) => state.menuTree
}

export const mutations: MutationTree<RootState> = {
    SET_CONFIG: (state, newConfig: ConfigType) => (state.config = newConfig),
    SET_MENU_TREE: (state, newTree: MenuTreeType) => (state.menuTree = newTree),
    TOGGLE_CATEGORY: (state, categoryId: string) => {
        if (!state.menuTree) {
            return;
        }

        const scanRecursivelly = (tree: MenuTreeType) => {
            for (const category of tree) {
                if (category.id === categoryId) {
                    category.isCategoryOpened = !category.isCategoryOpened;
                    return;
                }

                scanRecursivelly(category.children);
            }
        }

        scanRecursivelly(state.menuTree);
    },
}

export const actions: ActionTree<RootState, RootState> = {
    toggleCategory({ commit }, categoryId: string) {
        commit("TOGGLE_CATEGORY", categoryId)
    },
    async load({ commit }) {

        // Load config JSON
        const unprocessedConfig = await this.$axios.$get('/' + process.env.CONFIG_PATH);
        const config: ConfigType = {
            ...unprocessedConfig
        }

        config.settings = config.settings || {};
        config.panels = config.panels || {};
        config.groups = config.groups || {};
        config.theme = config.theme || {};
        config.appwrite = config.appwrite || {};
        config.dashboard = config.dashboard || {};

        config.dashboard.blocks = config.dashboard.blocks || [];

        config.settings.limitOptions = config.settings.limitOptions || [10, 25, 50, 100];
        config.settings.permissionOptions = config.settings.permissionOptions || [];
        config.theme.projectIcon = config.theme.projectIcon || "🤖";
        config.theme.projectName = config.theme.projectName || "AppwriteCMS";

        for (const groupId in config.groups) {
            const g = config.groups[groupId];

            // g.icon = g.icon || '📁';
            g.isOpenedByDefault = g.isOpenedByDefault === undefined || g.isOpenedByDefault === null ? false : g.isOpenedByDefault;
            g.menuSort = g.menuSort || 1;
            g.parentGroupId = g.parentGroupId || null;
        }

        for (const panelId in config.panels) {
            const p = config.panels[panelId];

            p.name = p.name || panelId;

            p.menuSort = p.menuSort || 1;
            p.groupId = p.groupId || null;
            p.defaultLimit = p.defaultLimit || config.settings.limitOptions[0];
            p.canDeleteDocuments = p.canDeleteDocuments === undefined || p.canDeleteDocuments === null ? true : p.canDeleteDocuments;
            p.hideAllRecordsLabel = p.hideAllRecordsLabel === undefined || p.hideAllRecordsLabel === null ? false : p.hideAllRecordsLabel;
            p.singleton = p.singleton || null;
            p.labels = p.labels || {};

            p.actions = p.actions || {};

            p.actions.create = p.actions.create || {};
            p.actions.edit = p.actions.edit || {};
            p.actions.view = p.actions.view || {};
            p.actions.list = p.actions.list || {};

            p.actions.create.blocks = p.actions.create.blocks || [];
            p.actions.edit.blocks = p.actions.edit.blocks || [];
            p.actions.view.blocks = p.actions.view.blocks || [];
            p.actions.list.blocks = p.actions.list.blocks || [];

            if (p.actions.edit.blocksReflectCreate) {
                p.actions.edit.blocks = p.actions.create.blocks;
            }

            p.actions.create.blocks = p.actions.create.blocks.map((b) => {
                b.config = b.config || {};
                b.array = b.array == undefined || b.array === null ? false : b.array;
                return b;
            });
            p.actions.edit.blocks = p.actions.edit.blocks.map((b) => {
                b.config = b.config || {};
                b.array = b.array == undefined || b.array === null ? false : b.array;
                return b;
            });
            p.actions.view.blocks = p.actions.view.blocks.map((b) => {
                b.config = b.config || {};
                b.array = b.array == undefined || b.array === null ? false : b.array;
                return b;
            });
            p.actions.list.blocks = p.actions.list.blocks.map((b) => {
                b.config = b.config || {};
                b.name = b.name || "Unnamed";
                // TODO: List array
                return b;
            });

            if (!p.hideAllRecordsLabel) {
                p.labels = {
                    'all-records': {
                        id: 'all-records',
                        name: "All records",
                        queries: [],
                        sorts: {}
                    },
                    ...p.labels
                };
            }

            for (const labelId in p.labels) {
                p.labels[labelId].id = labelId;
                p.labels[labelId].queries = p.labels[labelId].queries || [];
                p.labels[labelId].sorts = p.labels[labelId].sorts || {};
            }


        }

        commit('SET_CONFIG', config);
        AppwriteService.init(config);

        // Prepare menuTree
        const mapRecursion = (allGroups: any, currentGroup: any): any => {
            const children = [
                ...allGroups.filter((g: any) => g.parentGroupId === currentGroup.id).map((g: any) => mapRecursion(allGroups, g)),
                ...currentGroup.panels.map((p: any) => {
                    return {
                        sort: p.menuSort || 999999,
                        isCategory: false,
                        isCategoryOpened: false,
                        id: p.id,
                        title: p.name,
                        icon: p.icon,
                        children: []
                    }
                })
            ].sort((a, b) => a < b ? -1 : 1);

            return {
                isCategory: true,
                isCategoryOpened: currentGroup.isOpenedByDefault ? true : false,
                sort: currentGroup.menuSort || 999999,
                title: currentGroup.name,
                icon: currentGroup.icon,
                id: currentGroup.id,
                children
            }
        };

        const allGroups: any = [];
        for (const groupId in config.groups) {
            allGroups.push({
                ...config.groups[groupId],
                panels: [],
                id: groupId
            })
        }

        const panelsArray = [];
        for (const panelId in config.panels) {
            panelsArray.push({
                ...config.panels[panelId],
                id: panelId
            })
        }

        for (const panel of panelsArray) {
            const groupId = panel.groupId;
            const group = allGroups.find((g: any) => g.id === groupId);
            group?.panels.push(panel);
        }

        const rootGroups: any = allGroups.filter((g: any) => g.parentGroupId === null).map((g: any) => mapRecursion(allGroups, g));
        const rootPanels: any = panelsArray.filter((p) => p.groupId === null);

        const menuTree: MenuTreeType = [
            ...rootGroups.map((g: any) => {
                return {
                    ...g,
                }
            }),
            ...rootPanels.map((p: any) => {
                return {
                    sort: p.menuSort || 999999,
                    title: p.name,
                    icon: p.icon,
                    id: p.id,
                    children: [],
                    isCategory: false,
                    isCategoryOpened: false
                }
            })
        ].sort((a, b) => a < b ? -1 : 1);

        commit('SET_MENU_TREE', menuTree);
    },
}