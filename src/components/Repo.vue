<template>
    <section class="repo w-full py-4 flex flex-wrap items-center justify-center">
        <header class="w-full">
            <h4 class="text-blue-600 font-normal text-2xl">
                video2x
            </h4>
        </header>
        <section class="w-full px-4 flex flex-wrap items-start justify-center">
            <section class="md:w-8/12 w-full py-1">
                <p class="text-xs font-light">
                    A lossless video/GIF/image upscaler achieved with waifu2x, Anime4K, SRMD and RealSR. Started in Hack the Valley 2, 2018.
                </p>
            </section>
            <section class="md:w-4/12 w-full py-1 flex-wrap flex items-center">
                <div class="md:w-full w-6/12">
                    <p class="md:text-md text-sm text-gray-500">
                        <i :style="`color: ${setColorLanguage('Python')};`" class="fa fa-circle"></i> <span class="md:text-sm text-2xs">Python</span>
                    </p>
                </div>
                <div class="md:w-full w-6/12 px-1">
                    <p class="text-gray-500 ms:text-xs text-2xs">
                        Atualizado em 18/12/2020
                    </p>
                </div>
            </section>
        </section>        
    </section>
</template>
<script>
import GithubColors from "github-lang-colors";
export default {
    name: 'Repo',
    props: ['repo'],
    methods: {
        setColorLanguage(language) {
            return GithubColors(language);
        }
    }
}
</script>
<style lang="stylus">
    .repo
        border-bottom solid 1px #A3A3A3
</style>