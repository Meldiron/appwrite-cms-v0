import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { AppwriteService } from '~/services/appwrite';

export type ConfigType = {
    appwrite: {
        endpoint: string;
        projectId: string;
    },
    settings: {
        limitOptions: number[]; // Optional
    },
    theme: {
        projectName: string, // Optional
        projectLogo: string // Optional
    },
    groups: { // Can be empty array
        name: string,
        id: string,
        parentGroupId: string | null, // Optional, null means root level
        icon: string | null, // Optional
        menuSort: number, // Optional
        isOpenedByDefault: boolean // Optional
    }[],
    panels: { // Cannot not be empty array
        name: string,
        id: string,
        groupId: string | null, // Optional, null means no group
        icon: string | null, // Optional
        description: string | null, // Optional
        menuSort: number, // Optional
        searchAttributes: string[], // Optional, empty array means search disabled
        defaultLimit: number, // Optional
        labels: {
            id: string,
            name: string,
            queries: string[], // Optional
            sorts: { // Optional
                [attributeId: string]: 'ASC' | 'DESC'
            } | undefined
        }[] | undefined,
        attributes: {
            [attributeId: string]: {
                create: {
                    enabled: boolean; // Optional
                    type: string;
                    config: any;
                },
                edit: {
                    enabled: boolean; // Optional
                    type: string; // Can be '[[COPY_CREATE]]'
                    config: any;
                },
                view: {
                    enabled: boolean; // Optional
                    type: string;
                    config: any;
                },
                list: {
                    type: string;
                    config: any;
                }
            }
        }
    }[]
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
        const unprocessedConfig = await this.$axios.$get('/config.json');
        const config: ConfigType = {
            ...unprocessedConfig
        }

        config.settings.limitOptions = config.settings.limitOptions || [10, 25, 50, 100];
        config.theme.projectLogo = config.theme.projectLogo || "🤖";
        config.theme.projectName = config.theme.projectName || "Appwrite CMS";
        config.groups = config.groups.map((g) => {
            // g.icon = g.icon || '📁';
            g.isOpenedByDefault = g.isOpenedByDefault === undefined || g.isOpenedByDefault === null ? false : g.isOpenedByDefault;
            g.menuSort = g.menuSort || 1;
            g.parentGroupId = g.parentGroupId || null;

            return g;
        });
        config.panels = config.panels.map((p) => {
            p.menuSort = p.menuSort || 1;
            p.groupId = p.groupId || null;
            p.defaultLimit = p.defaultLimit || 25;
            p.labels = p.labels || [];
            p.attributes = p.attributes || {};

            p.labels = p.labels.map((l) => {
                l.queries = l.queries || [];
                l.sorts = l.sorts || {};

                return l;
            });

            for (const attributeId in p.attributes) {
                const a = p.attributes[attributeId];
                a.edit.enabled = a.edit.enabled === null || a.edit.enabled === undefined ? true : a.edit.enabled;
                a.create.enabled = a.create.enabled === null || a.create.enabled === undefined ? true : a.create.enabled;
                a.view.enabled = a.view.enabled === null || a.view.enabled === undefined ? true : a.view.enabled;

                a.edit.config = a.edit.config || {};
                a.create.config = a.create.config || {};
                a.view.config = a.view.config || {};
                a.list.config = a.list.config || {};
            }

            return p;
        });


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

        const allGroups: any = config.groups.map((g) => {
            return {
                ...g,
                panels: []
            }
        });

        for (const panel of config.panels) {
            const groupId = panel.groupId;
            const group = allGroups.find((g: any) => g.id === groupId);
            group?.panels.push(panel);
        }

        const rootGroups: any = allGroups.filter((g: any) => g.parentGroupId === null).map((g: any) => mapRecursion(allGroups, g));
        const rootPanels: any = config.panels.filter((p) => p.groupId === null);

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

        console.log(menuTree);

        commit('SET_MENU_TREE', menuTree);
    },
}