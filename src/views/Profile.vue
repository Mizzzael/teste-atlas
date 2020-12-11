<template>
    <section class="w-full">
        <HeaderGeneric title="Perfil" />
        <BodyPage>
            OK
        </BodyPage>
    </section>
</template>

<script>
import HeaderGeneric from "./components/HeaderGeneric.vue";
import BodyPage from "./components/BodyPage.vue";

export default {
    name: "Profile",
    components: {
        HeaderGeneric,
        BodyPage
    }
}
</script>