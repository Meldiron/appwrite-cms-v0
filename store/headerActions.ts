import { GetterTree, ActionTree, MutationTree } from 'vuex'

export type HeaderActionsEnum = 'none' | 'onCreateSave' | 'onEditSave';
export type HeaderActionsStore = {
    omitter: HeaderActionsEnum
    isLoading: boolean
};

type StateCallback = () => HeaderActionsStore;

export const state: StateCallback = () => ({
    omitter: "none",
    isLoading: false
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    GET_OMITTER: state => state.omitter,
    GET_IS_LOADING: state => state.isLoading,
}

export const mutations: MutationTree<RootState> = {
    _SET_ACTION: (state, action: HeaderActionsEnum) => (state.omitter = action),
    SET_LOADING: (state, isLoading: boolean) => (state.isLoading = isLoading),
}

export const actions: ActionTree<RootState, RootState> = {
    async SET_ACTION({ commit }, action: HeaderActionsEnum) {
        commit("_SET_ACTION", action)

        await new Promise((pRes) => {
            setTimeout(() => {
                pRes(true);
            }, 1);
        });

        commit("_SET_ACTION", "none")
    }
}