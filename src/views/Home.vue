<template>
  <section
    class="home colors.warmGray:100 container m-auto fixed top-0 bottom-0 left-0 right-0 flex flex-wrap items-center justify-center"
  >
    <section class="w-full">
      <header class="w-full mb-4 py-4">
        <img
          class="mx-auto w-11/12 home.brand"
          src="../assets/img/logo-large.svg"
          alt="Github Search"
        />
      </header>
      <form class="xl:w-4/12 lg:w-6/12 md:6/12 w-11/12 mx-auto py-2 my-4">
        <input
          v-model="search"
          type="text"
          class="w-10/12 mx-auto rounded-sm py-2 px-4 block shadow text-sm"
          placeholder="Pesquisar..."
        />
        <section
          class="w-10/12 flex flex-wrap justify-center items-center lg:py-6 py-4 mx-auto"
        >
          <section class="w-6/12 text-left">
            <button
              :disabled="loadingAll"
              v-on:click="goToUsersSearch()"
              class="w-11/12 mx-auto rounded-sm inline-block text-sm font-normal text-white bg-blue-800 py-2"
              type="button"
            >
              Ver Todos
            </button>
          </section>
          <section class="w-6/12 text-right">
            <button
              :disabled="loadingUser"
              v-on:click="getUser()"
              class="w-11/12 mx-auto rounded-sm inline-block text-sm font-normal text-white bg-green-400 py-2"
              type="button"
            >
              <svg
                v-if="loadingUser"
                class="animate-spin inline mx-1 w-1/12 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Buscar
            </button>
          </section>
          <section v-if="error" class="w-full py-4 mx-auto">
            <div class="rounded-lg py-4 px-6 bg-red-400">
              <p class="text-xs text-white">
                {{ error }}
              </p>
            </div>
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
      search: "",
      error: "",
      loadingUser: false,
      loadingAll: false
    };
  },
  methods: {
    setSearchState() {
      this.$store.commit("setSearch", this.search);
    },
    setUserState(user) {
      this.$store.commit("setUser", user);
    },
    clearSearchState() {
      this.$store.commit("clearSearch");
    },
    clearUserState() {
      this.$store.commit("clearUser");
    },
    goToUsersSearch() {
      if (!this.search) {
        this.error = `Digite o nome do usuário(s) que você deseja pesquisar.`;
        return;
      }

      this.setSearchState();
      this.loadingAll = true;
      this.$router.push(`/users/`);
    },
    async getUser() {
      if (!this.search) {
        this.error = `Digite o nome do usuário(s) que você deseja pesquisar.`;
        return;
      }

      this.loadingUser = true;

      github_api
        .getUser(this.search)
        .then(({ data }) => {
          this.setSearchState();
          this.setUserState(data);
          this.$router.push(`/user/${data.login}`);
          this.loadingUser = false;
        })
        .catch(() => {
          this.error = `Usuário ${this.search} não encontrado!`;
          this.clearSearchState();
          this.clearUserState();
          this.loadingUser = false;
        });
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
