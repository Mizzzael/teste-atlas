<template>
    <section id=repos class="w-full pt-6">
        <section class="w-10/12 mx-auto">
            <Repo />
            <Repo />
            <Repo />
            <Repo />
            <Repo />
            <Repo />
            <Repo />
            <Repo />
        </section>
    </section>
</template>
<script>
import Repo from "../components/Repo.vue";
export default {
    name: "Repos",
    components: {
        Repo
    }
}
</script>