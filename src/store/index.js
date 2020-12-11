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
        }
    },
    actions: {},
    modules: {},
    plugins: [createLogger()]
});