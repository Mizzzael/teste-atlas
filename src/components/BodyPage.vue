<template>
  <section
    class="body-page container bg-white rounded-sm mx-auto md:shadow md:mt-8"
  >
    <slot></slot>
  </section>
</template>
<script>
export default {
  name: "BodyPage"
};
</script>
<style lang="stylus">
@media only screen and (min-width: 1024px)
    .body-page
        max-width 960px
@media only screen and (min-width: 1201px)
    .body-page
        max-width 1200px
</style>
