<template>
  <section id="profile" class="w-full">
    <HeaderGeneric title="Perfil" />
    <BodyPage v-if="user.node_id">
      <header class="profile.header w-full relative">
        <section
          class="profile.header_row relative w-full flex flex-wrap items-end"
        >
          <section class="px-1 md:mx-0 mx-auto">
            <figure
              class="profile.photo rounded-full bg-white p-1 overflow-hidden relative shadow mx-auto"
            >
              <section
                class="profile.photo_canvas rounded-full overflow-hidden absolute m-auto top-0 bottom-0 right-0 left-0"
              >
                <img
                  class="absolute m-auto top-0 bottom-0 right-0 left-0"
                  :src="user.avatar_url"
                  alt=""
                />
              </section>
            </figure>
          </section>
          <section class="profile.username">
            <div class="md:pl-8 md:pb-4 inline-block md:w-auto w-full">
              <h2
                v-if="user.name"
                class="profile.username_name lg:text-2xl text-blue-900 md:text-lg text-sm font-bold md:text-right text-center"
              >
                {{ user.name }}
              </h2>
              <h4
                v-if="user.login"
                class="lg:text-md text-xs md:text-right text-center text-gray-600 font-light"
              >
                <i class="fa fa-user"></i> {{ user.login }}
              </h4>
            </div>
          </section>
          <section
            class="profile.infos flex flex-wrap justify-end items-center px-2 md:pb-2 md:py-0 py-4"
          >
            <div class="lg:px-4 md:px-2 md:w-auto w-4/12">
              <p class="text-center lg:text-xl text-sm text-blue-900 m-0">
                <i class="fa fa-male"></i> <small>{{ user.following }}</small>
              </p>
              <p class="text-center lg:text-xl text-sm text-blue-900 m-0">
                Seguindo
              </p>
            </div>
            <div class="lg:px-4 md:px-2 md:w-auto w-4/12">
              <p class="text-center lg:text-xl text-sm text-blue-900 m-0">
                <i class="fa fa-folder-open"></i>
                <small>{{ user.public_repos }}</small>
              </p>
              <p class="text-center lg:text-xl text-sm text-blue-900 m-0">
                Projetos
              </p>
            </div>
            <div class="lg:px-4 md:px-2 md:w-auto w-4/12">
              <p class="text-center lg:text-xl text-sm text-blue-900 m-0">
                <i class="fa fa-users"></i> <small>{{ user.followers }}</small>
              </p>
              <p class="text-center lg:text-xl md:text-sm text-sm text-blue-900 m-0">
                Seguidores
              </p>
            </div>
          </section>
        </section>
      </header>
      <section
        class="profile.body w-full flex flex-wrap justify-center items-start"
      >
        <aside class="profile.aside lg:w-3/12 md:w-4/12 w-full md:shadow">
          <section class="w-full md:pt-16">
            <nav class="w-full">
              <ul class="bg-blueg-100 w-full flex flex-wrap">
                <li class="profile.navigation md:w-full w-6/12 relative">
                  <router-link :to="`/user/${userParam}/`">
                    <span
                      class="profile.navigation_button text-lg py-4 text-center w-full block"
                    >
                      Sobre
                    </span>
                  </router-link>
                </li>
                <li
                  id="repos_button"
                  class="profile.navigation md:w-full w-6/12 relative"
                >
                  <router-link :to="`/user/${userParam}/repos`">
                    <span
                      class="profile.navigation_button text-lg py-4 text-center w-full block"
                    >
                      Projetos
                    </span>
                  </router-link>
                </li>
              </ul>
            </nav>
          </section>
        </aside>
        <section
          id="profileviews"
          class="lg:w-9/12 md:w-8/12 w-full profile.content overflow-y-auto"
        >
          <router-view />
        </section>
      </section>
    </BodyPage>
    <section v-if="!user.node_id" class="w-3/12 mx-auto">
      <Loading />
    </section>
  </section>
</template>

<script>
import Github from "../../src/assets/js/Github.js";
import { mapGetters } from "vuex";
import HeaderGeneric from "../components/HeaderGeneric.vue";
import BodyPage from "../components/BodyPage.vue";
import Loading from "../components/Loading.vue";

const github_api = new Github();

export default {
  name: "Profile",
  data() {
    return {
      user: {},
      routeName: "",
      userParam: this.$route.params.user
    };
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  methods: {
    setUserState(user) {
      this.$store.commit("setUser", user);
    }
  },
  components: {
    HeaderGeneric,
    BodyPage,
    Loading
  },
  mounted() {
    const user = this.getUser;
    if (!user.node_id || this.$route.params.user !== user.login) {
      github_api.getUser(this.$route.params.user).then(({ data }) => {
        this.setUserState(data);
        this.user = this.getUser;
      });
    } else {
      this.user = user;
    }
  }
};
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
            height 294px

    .profile\\.photo
        width 253px
        height 253px
        bottom -40px
        &_canvas
            width 238px
            height 238px

    .profile\\.username
        margin-top 20px
        width calc((768px - 261px) * 0.4)
        &_name
            color #000000

    .profile\\.infos
        @extends .profile\\.username
        width calc((768px - 261px) * 0.58)

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
            height 303px

    .profile\\.photo
        width 240px
        height 240px
        bottom -30px
        &_canvas
            width 230px
            height 230px

    .profile\\.username
        margin-top 30px
        width calc((960px - 248px) * 0.4)

    .profile\\.infos
        @extends .profile\\.username
        width calc((960px - 248px) * 0.6)

@media only screen and (min-width: 1201px)
    .profile\\.header
        padding-top 55px
        &:before
            height 363px

    .profile\\.photo
        width 300px
        height 300px
        bottom -30px
        &_canvas
            width 290px
            height 290px

    .profile\\.username
        margin-top 30px
        width calc((1200px - 308px) * 0.4)

    .profile\\.infos
        @extends .profile\\.username
        width calc((1200px - 308px) * 0.6)
</style>
