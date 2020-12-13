<template>
    <section class="thumb md:w-1/5 w-full py-4 flex flex-wrap items-center justify-center md:shadow">
        <section class="md:w-full thumb.photo-box">
            <figure class="thumb.photo shadow relative rounded-full mx-auto md:mb-4">
                <div class="thumb.photo_canvas overflow-hidden left-0 right-0 top-0 bottom-0 absolute m-auto rounded-full">
                    <img :src="photo" alt="">
                </div>
            </figure>
        </section>
        <section class="md:w-full thumb.label">
            <a v-on:click="goTo()" href="Javascript: void(0)">
                <span class="md:text-center lg:text-md md:text-sm text-lg text-blue-800 block">
                    {{login}}
                </span>
            </a>
        </section>
    </section>
</template>
<script>
export default {
    name: "Thumb",
    props: ['user'],
    data() {
        return {
            photo: '',
            login: ''
        }
    },
    methods: {
        goTo() {
            this.$store.commit('clearUser');
            this.$router.push(`/user/${this.login}/`);
        }
    },
    mounted() {
        const {
            avatar_url,
            login
        } = this.user;

        this.photo = avatar_url;
        this.login = login;
    }
}
</script>
<style lang="stylus">
    
    @media only screen and (max-width 768px)
        .thumb
            border-bottom solid 1px #a3a3a3 
            &\\.photo
                width 80px
                height 80px
                &_canvas
                    width 70px
                    height 70px

        .thumb\\.photo-box
            width 100px

        .thumb\\.label
            width calc(100% - 100px)
            

    @media only screen and (min-width 768px)
        .thumb\\.photo
            width 110px
            height 110px
            &_canvas
                width 100px
                height 100px

    @media only screen and (min-width 1024px)
       .thumb\\.photo
            width 140px
            height 140px
            &_canvas
                width 130px
                height 130px   

</style>