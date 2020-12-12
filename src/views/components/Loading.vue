<template>
    <section :id="id + '-component'" class="w-full my-8">
        <figure :id="id" class="xl:w-4/12 lg:w-6/12 md:w-7/12 w-11/12 mx-auto" >
        </figure>
        <section class="w-full">
            <p class="text-center text-xl font-body text-blue-500">
                Aguarde...
            </p>
        </section>
    </section>
</template>

<script>
import Lottie from 'lottie-web';
import Bunny from "../../assets/animations/15355-bunny.json";

export default {
    name: 'Loading',
    data() {
        return {
            id: `loading-github-search-${new Date().getTime()}`
        }
    },
    methods: {
        initAnimation() {
            Lottie.loadAnimation({
                container: document.getElementById(this.id), 
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: Bunny // the path to the animation json
            })
        }
    },
    mounted() {
        this.initAnimation();
    }
}
</script>