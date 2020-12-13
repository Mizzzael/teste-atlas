<template>
  <section class="repo w-full py-4 flex flex-wrap items-center justify-center">
    <header class="w-full">
      <a
        :href="repo.html_url"
        target="_blank"
        class="text-blue-600 font-normal text-2xl break-all"
      >
        {{ repo.name }}
      </a>
    </header>
    <section class="w-full px-4 flex flex-wrap items-start justify-center">
      <section class="md:w-8/12 w-full py-1">
        <a
          :href="repo.html_url"
          target="_blank"
          class="text-xs font-light break-all"
        >
          {{ repo.description }}
        </a>
      </section>
      <section class="md:w-4/12 w-full py-1 flex-wrap flex items-center">
        <div class="md:w-full w-6/12">
          <p v-if="repo.language" class="md:text-md text-sm text-gray-500">
            <i
              :style="`color: ${setColorLanguage(repo.language)};`"
              class="fa fa-circle"
            ></i>
            <span class="md:text-sm text-2xs px-1">{{ repo.language }}</span>
          </p>
        </div>
        <div class="md:w-full w-6/12 px-1">
          <p class="text-gray-500 ms:text-xs text-2xs">
            Atualizado em {{ repo.updated_at | formatData }}
          </p>
        </div>
      </section>
    </section>
  </section>
</template>
<script>
import GithubColors from "github-lang-colors";
export default {
  name: "Repo",
  props: ["repo"],
  methods: {
    setColorLanguage(language) {
      return GithubColors(language);
    }
  },
  filters: {
    formatData(date) {
      const dateToFormat = new Date(date);
      return new Intl.DateTimeFormat("pt-BR").format(dateToFormat);
    }
  }
};
</script>
<style lang="stylus">
.repo
    border-bottom solid 1px #A3A3A3
</style>
