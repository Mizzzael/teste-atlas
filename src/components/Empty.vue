<template>
    <section :id="id + '-component'" class="w-full my-8">
        <figure :id="id" class="xl:w-8/12 lg:w-6/12 md:w-7/12 w-11/12 mx-auto" >
        </figure>
    </section>
</template>

<script>
import Lottie from 'lottie-web'
import Empty from "../assets/animations/8021-empty-and-lost.json"

export default {
    name: 'Loading',
    data() {
        return {
            id: `empty-github-search-${new Date().getTime()}`
        }
    },
    methods: {
        initAnimation() {
            Lottie.loadAnimation({
                container: document.getElementById(this.id), 
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: Empty // the path to the animation json
            })
        }
    },
    mounted() {
        this.initAnimation();
    }
}
</script>