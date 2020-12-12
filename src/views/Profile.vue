<template>
    <section id="profile" class="w-full">
        <HeaderGeneric title="Perfil" />
        <BodyPage v-if="!user.node_id">
            <header class="profile.header w-full relative">
                <section class="profile.header_row relative w-full flex flex-wrap items-end">
                    <section class="px-1 md:mx-0 mx-auto">
                        <figure class="profile.photo rounded-full bg-white p-1 overflow-hidden relative shadow mx-auto">
                            <section class="profile.photo_canvas rounded-full overflow-hidden absolute m-auto top-0 bottom-0 right-0 left-0">
                                <img src="../assets/img/photo.jpg" alt="">
                            </section>
                        </figure>
                    </section>
                    <section class="profile.username">
                        <div class="md:pl-8 md:pb-4 inline-block md:w-auto w-full">
                            <h2 class="profile.username_name lg:text-2xl text-blue-900 md:text-xl font-bold md:text-right text-center">
                                Mel Bianco
                            </h2>
                            <h4 class="lg:text-md text-sm md:text-right text-center text-gray-600 font-light">
                                <i class="fa fa-user"></i> meelbianco_
                            </h4>
                        </div>
                    </section>
                    <section class="profile.infos flex flex-wrap justify-end items-center px-2 md:pb-2 md:py-0 py-4">
                        <div class="lg:px-4 md:px-2 md:w-auto w-4/12">
                            <p class="text-center md:text-xl text-sm text-blue-900 m-0">
                                <i class="fa fa-male"></i> <small>122</small>
                            </p>
                            <p class="text-center md:text-xl text-sm text-blue-900 m-0">
                                Seguindo
                            </p>
                        </div>
                        <div class="lg:px-4 md:px-2 md:w-auto w-4/12">
                            <p class="text-center md:text-xl text-sm text-blue-900 m-0">
                                <i class="fa fa-folder-open"></i> <small>31</small>
                            </p>
                            <p class="text-center md:text-xl text-sm text-blue-900 m-0">
                                Projetos
                            </p>
                        </div>
                        <div class="lg:px-4 md:px-2 md:w-auto w-4/12">
                            <p class="text-center md:text-xl text-sm text-blue-900 m-0">
                                <i class="fa fa-users"></i> <small>44</small>
                            </p>
                            <p class="text-center md:text-xl text-sm text-blue-900 m-0">
                                Seguidores
                            </p>
                        </div>
                    </section>
                </section>
            </header>
            <section class="profile.body w-full flex flex-wrap justify-center items-start">
                <aside class="profile.aside lg:w-3/12 md:w-4/12 w-full md:shadow">
                    <section class="w-full md:pt-16">
                        <nav class="w-full">
                            <ul class="bg-blueg-100 w-full flex flex-wrap">
                                <li class="profile.navigation md:w-full w-6/12 relative">
                                    <router-link :to="`/user/${userParam}/`" >
                                        <span class="profile.navigation_button text-lg py-4 text-center w-full block">
                                            Sobre
                                        </span>
                                    </router-link>
                                </li>
                                <li id=repos_button class="profile.navigation md:w-full w-6/12 relative">
                                    <router-link :to="`/user/${userParam}/repos`" >
                                        <span class="profile.navigation_button text-lg py-4 text-center w-full block">
                                            Projetos
                                        </span>
                                    </router-link>
                                </li>
                            </ul>
                        </nav>
                    </section>
                </aside>
                <section class="lg:w-9/12 md:w-8/12 w-full profile.content overflow-y-auto">
                    <router-view />
                </section>
            </section>
        </BodyPage>
        <section v-if="user.node_id" class="w-3/12 mx-auto">
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
            user: {},
            routeName: '',
            userParam: this.$route.params.user
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
        }
    },
    components: {
        HeaderGeneric,
        BodyPage,
        Loading
    },
    mounted() {
        const user = this.getUser;        
        console.log(user.node_id, github_api, this.$router);
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

<style lang="stylus">
    .profile\\.header 
        &_row
            z-index 2
        &:before
            content ""
            width 100%
            position absolute
            top 0
            left 0
            z-index 1
            background-image url('../assets/img/banner-top.jpg')
            background-position bottom center
            background-size 100%
            background-repeat no-repeat

    .profile\\.navigation_button
        &:focus
            outline none

    @media only screen and (max-width: 768px)
        .profile\\.header
            padding-top 5px
            &:before
                height 100px
                background-size 140%

        .profile\\.photo
            width 90px
            height 90px
            bottom -20px
            &_canvas
                width 80px
                height 80px

        .profile\\.username
            margin-top 25px
            width 100%

        .profile\\.infos
            @extends .profile\\.username
            margin-top 0

        .profile\\.navigation
            &:nth-child(odd)
                border-right 1px solid #CBD5E1
        
        .router-link-exact-active
            & .profile\\.navigation_button
                border-bottom solid 4px #3B82F6

    @media only screen and (min-width: 768px)
        .profile\\.header
            padding-top 35px
            &:before
                height 160px

        .profile\\.photo
            width 125px
            height 125px
            bottom -20px
            &_canvas
                width 115px
                height 115px

        .profile\\.username
            margin-top 20px
            width calc((768px - 125px) * 0.4)
            &_name
                color #000000

        .profile\\.infos
            @extends .profile\\.username
            width calc((768px - 125px) * 0.58)

        .profile\\.body
            height calc(100vh - 314px)

        .profile\\.aside
            @extends .profile\\.body

        .profile\\.content
            @extends .profile\\.body

        .profile\\.navigation
            &:nth-child(odd)
                border-bottom 1px solid #CBD5E1

        .router-link-exact-active
            & .profile\\.navigation_button
                border-right solid 4px #3B82F6

    @media only screen and (min-width: 1024px)
        .profile\\.header 
            padding-top 55px
            &:before
                height 200px

        .profile\\.photo
            width 145px
            height 145px
            bottom -30px
            &_canvas
                width 135px
                height 135px

        .profile\\.username
            margin-top 30px
            width calc((960px - 160px) * 0.4)

        .profile\\.infos
            @extends .profile\\.username
            width calc((960px - 160px) * 0.6)

    @media only screen and (min-width: 1201px)
        .profile\\.username
            width calc((1200px - 160px) * 0.4)
        
        .profile\\.infos
            width calc((1200px - 160px) * 0.6)
    
</style>