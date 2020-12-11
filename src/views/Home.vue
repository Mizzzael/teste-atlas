<template>
  <section class="home colors.warmGray:100 container m-auto fixed top-0 bottom-0 left-0 right-0 flex flex-wrap items-center justify-center">
    <section class="w-full">
      <header class="w-full mb-4 py-4">
        <img class="mx-auto w-11/12 home.brand" src="../assets/img/logo-large.svg" alt="Github Search">    
      </header>
      <form class="xl:w-4/12 lg:w-6/12 md:6/12 w-11/12 mx-auto py-2 my-4">
        <input v-model="search" type="text" class="w-10/12 mx-auto rounded-sm py-2 px-4 block shadow text-sm" placeholder='Pesquisar...' />
        <section class="w-10/12 flex flex-wrap justify-center items-center lg:py-6 py-4 mx-auto">
          <section class="w-6/12 text-left">
            <button class="w-11/12 mx-auto rounded-sm inline-block text-sm font-normal text-white bg-blue-800 py-2" type=button >
              Ver Todos
            </button>
          </section>
          <section class="w-6/12 text-right">
            <button v-on:click="getUser()" class="w-11/12 mx-auto rounded-sm inline-block text-sm font-normal text-white bg-green-400 py-2" type=button >
              Buscar
            </button>
          </section>
        </section>
      </form>
    </section>
  </section>
</template>

<script>
import Github from "../../src/assets/js/Github.js";
const github_api = new Github();

export default {
  name: "Home",
  data() {
    return {
      search: ""
    }
  },
  methods: {
    setSearchState() {
      this.$store.commit('setSearch', this.search)
    },
    async getUser() {
      let { data } = await github_api.getUser(this.search);
      this.setSearchState();
      this.$store.commit('setUser', data);
    }
  }
};
</script>

<style lang="stylus">
  @media only screen and (max-width: 1200px)
    .home
      height 500px
      &\\.brand
        max-width 100px
  @media only screen and (min-width: 1201px)
    .home
      height 600px
      &\\.brand
        max-width 120px

</style>
