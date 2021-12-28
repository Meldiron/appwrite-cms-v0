import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { AppwriteService } from '~/services/appwrite';

export type ConfigType = {
    appwrite: {
        endpoint: string;
        projectId: string;
    }
    theme: {
        projectName: string,
        projectLogo: string
    },
    groups: {
        name: string,
        id: string,
        parentGroupId: string | null | undefined,
        icon: string | null | undefined,
        menuSort: number | null | undefined,
        isOpenedByDefault: boolean | undefined
    }[],
    panels: {
        name: string,
        id: string,
        groupId: string | null | undefined,
        icon: string | null | undefined,
        description: string | null | undefined,
        menuSort: number | null | undefined
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
        const config: ConfigType = await this.$axios.$get('/config.json');
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