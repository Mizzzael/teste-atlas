import Vue from "vue";
import Vuex, { createLogger } from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        search: '',
        users: [],
        user: {}
    },
    mutations: {
        setSearch(state, search) {
            state.search = search;
        },
        setUser(state, user) {
            state.user = user;
        },
        clearSearch(state) {
            state.search = '';
        },
        clearUser(state) {
            state.user = {};
        }
    },
    getters: {
        getUser: state => state.user,
        getSearch: state => state.search,
    },
    actions: {},
    modules: {},
    plugins: [createLogger()]
});