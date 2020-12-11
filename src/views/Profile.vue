<template>
    <section class="w-full">
        <HeaderGeneric title="Perfil" />
        <BodyPage v-if="user.node_id">
            ok
        </BodyPage>
        <section v-if="!user.node_id" class="w-3/12 mx-auto">
            <Loading />
        </section>
    </section>
</template>

<script>
import Github from "../../src/assets/js/Github.js";
import {mapGetters} from "vuex"
import HeaderGeneric from "./components/HeaderGeneric.vue";
import BodyPage from "./components/BodyPage.vue";
import Loading from "./components/Loading.vue";

const github_api = new Github();

export default {
    name: "Profile",
    data() {
        return {
            user: {}
        }
    },
    computed: {
        ...mapGetters([
            'getUser'
        ])
    },
    methods: {
        setUserState(user) {
            this.$store.commit('setUser', user);
        },
    },
    components: {
        HeaderGeneric,
        BodyPage,
        Loading
    },
    mounted() {
        const user = this.getUser;
        console.log(user.node_id, github_api);
        // if(!user.node_id) {
        //     github_api.getUser(this.$route.params.user).then(({data}) => {
        //         this.setUserState(data);
        //         this.user = this.getUser;
        //     });
        // } else {
        //     this.user = user;
        // }
    }
}
</script>