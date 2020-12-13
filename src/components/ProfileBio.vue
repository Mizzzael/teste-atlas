<template>
    <article id="bio" class="md:w-10/12 w-10/12 mx-auto md:px-8 pt-10 pb-4 overflow-y-auto">
        <h6 v-if="user.bio" class="text-lg text-blue-600 py-2">
            Bio
        </h6>
        <p v-if="user.bio" class="text-sm font-light mb-8">
            {{user.bio}}
        </p>
        <p v-if="user.location" class="my-1 md:text-lg text-sm text-blue-800">
            <i class="fa fa-home"></i> {{user.location}}
        </p>
        <p v-if="user.html_url" class="my-1 md:text-lg text-sm text-blue-800">
            <i class="fa fa-laptop"></i> {{user.html_url}}
        </p>
        <p v-if="user.company" class="my-1 md:text-lg text-sm text-blue-800">
            <i class="fa fa-building"></i> {{user.company}}
        </p>
    </article>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    name: 'Bio',
    data() {
        return {
            user: {}
        }
    },
    computed: {
        ...mapGetters([
            'getUser'
        ])
    },
    mounted() {
        this.user = this.getUser;
    }
}
</script>