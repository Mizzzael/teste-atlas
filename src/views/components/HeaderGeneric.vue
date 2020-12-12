<template>
    <header class="w-full mx-auto md:shadow-md py-4 bg-white">
        <section class="HeaderGen.box container mx-auto">
            <img v-on:click="goHome()" class="md:block hidden" src="../../assets/img/logo-large-horizontal.svg" alt="Github Search">
            <section class="md:hidden w-full flex flex-wrap text-lg px-4 items-center text-gray-900">
                <i v-on:click="goBack()" class="fa fa-arrow-left text-gray-400"></i><span class="block text-sm px-4">{{title}}</span>
            </section>
        </section>
    </header>
</template>

<script>
    export default {
        name: "HeaderGenericDesktop",
        props: ['title'],
        beforeRouteEnter (to, from, next) {
            next(t => {
                console.log(to, t)
            })
        },
        methods: {
            goHome() {
                this.$router.push('/');
            },
            goBack() {
                this.$router.back();
            }
        }
    }
</script>

<style lang="stylus">
    @media only screen and (min-width: 1024px)
        .HeaderGen\\.box
            max-width 960px
    @media only screen and (min-width: 1201px)
        .HeaderGen\\.box
            max-width 1200px
</style>