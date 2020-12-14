<template>
  <section id="repos" class="w-full pt-6 pb-4">
    <section v-if="repos.length" class="w-10/12 mx-auto">
      <Repo
        v-for="(repo, index) in repos"
        :key="'repo-' + index"
        :repo="repo"
      />
    </section>
    <section v-if="!repos.length && !loading" class="md:w-8/12 w-11/12 mx-auto">
      <Empty />
    </section>
    <section v-if="loading" class="md:w-6/12 w-5/12 mx-auto">
      <Loading />
    </section>
    <section class="md:w-4/12 w-8/12 mx-auto" v-if="endPage && repos.length">
      <End />
    </section>
  </section>
</template>
<script>
import Loading from "./Loading.vue";
import Empty from "./Empty.vue";
import End from "./End.vue";
import { mapGetters } from "vuex";
import Repo from "../components/Repo.vue";
import Github from "../assets/js/Github.js";
const github_api = new Github();
export default {
  name: "Repos",
  data() {
    return {
      user: {},
      repos: [],
      query: {
        userName: "",
        page: 1,
        per_page: 8
      },
      loading: false,
      endPage: false
    };
  },
  methods: {
    prepareQuery(userName, page) {
      this.query.userName = userName;
      this.query.page = page;
    },
    makeQuery(query, callback = function() {}) {
      github_api.getRepos(query).then(({ data }) => {
        this.repos = [...this.repos, ...data];
        if (data.length < 8 || !data.length) {this.endPage = true;}
        callback(data);
      });
    },
    getNextPage() {
      if (this.endPage) {
        return;
      }
      this.loading = true;
      setTimeout(() => {
        if (
          !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          window.document
            .querySelector("#profileviews")
            .scrollTo(
              0,
              window.document.querySelector("#profileviews").scrollHeight
            );
        } else {
          window.scrollTo(
            0,
            window.document.querySelector("body").scrollHeight
          );
        }
      }, 200);
      this.query.page += 1;
      setTimeout(() => {
        this.makeQuery(this.query, () => {
          this.loading = false;
        });
      }, 3000);
    }
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  components: {
    Repo,
    Loading,
    Empty,
    End
  },
  mounted() {
    this.user = this.getUser;
    this.prepareQuery(this.user.login, 1);
    this.loading = true;
    this.makeQuery(this.query, () => {
      this.loading = false;
    });
    if (
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      const profileviews = window.document.querySelector("#profileviews");
      profileviews.addEventListener(
        "scroll",
        () => {
          if (!window.document.querySelector("#repos") || this.loading) return;
          const { height } = window.document
            .querySelector("#repos")
            .getBoundingClientRect();
          const windowHeight = profileviews.getBoundingClientRect().height;
          if (
            profileviews.scrollTop === height - windowHeight &&
            !this.endPage
          ) {
            this.getNextPage();
          }
        },
        false
      );
    }
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      const body = window.document.querySelector("body");
      window.addEventListener(
        "touchmove",
        () => {
          if (this.loading) return;
          const { height } = body.getBoundingClientRect();
          const windowHeight = window.innerHeight;          
          if (
            Math.floor(window.scrollY) >=
              Math.floor(height - windowHeight) &&
            !this.endPage
          ) {
            this.getNextPage();
          }
        },
        false
      );
    }
  }
};
</script>
