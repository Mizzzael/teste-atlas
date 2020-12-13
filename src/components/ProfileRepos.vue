<template>
    <section id=repos class="w-full pt-6 pb-4">
        <section v-if="repos.length" class="w-10/12 mx-auto">
            <Repo v-for="(repo, index) in repos" :key="'repo-'+index" :repo="repo" />
        </section>
        <section v-if="!repos.length && !loading" class="w-10/12 mx-auto">
            <Empty />
        </section>
        <section v-if="loading" class="lg:w-6/12 mx-auto">
            <Loading />
        </section>
        <section class="w-4/12 mx-auto" v-if="endPage">
            <End />
        </section>
    </section>
</template>
<script>
import Loading from "./Loading.vue"
import Empty from "./Empty.vue"
import End from "./End.vue"
import {mapGetters} from "vuex"
import Repo from "../components/Repo.vue"
import Github from "../assets/js/Github.js"

const github_api = new Github();

export default {
    name: "Repos",
    data() {
        return {
            user: {},
            repos: [],
            query: {
                userName: '',
                page: 1,
                per_page: 8
            },
            pageNumber: 0,
            loading: false,
            endPage: false
        }
    },
    methods: {
        prepareQuery(userName, page) {
            this.query.userName = userName;
            this.query.page = page;
        },
        makeQuery(query, callback=function(){}) {
            github_api.getRepos(query).then(({data}) => {
                this.repos = [...this.repos, ...data];
                if(data.length < 8) this.endPage = true;
                this.pageNumber = Math.round(parseInt(data.total_count) / this.query.per_page);
                callback(data);
            });            
        },
        getNextPage() {
            if(this.endPage) {
                return;
            }
            this.loading = true;
            this.query.page += 1;
            setTimeout(() => {
                this.makeQuery(this.query, () => {
                    this.loading = false;
                });
            }, 3000);
        },
    },
    computed: {
        ...mapGetters(['getUser'])
    },
    components: {
        Repo,
        Loading, 
        Empty,
        End
    },
    mounted() {
        this.user = this.getUser;
        this.prepareQuery(this.user.login, 1);
        this.loading = true;
        this.makeQuery(this.query, () => {
            this.loading = false;
        });

        const profileviews = window.document.querySelector('#profileviews');
        profileviews.addEventListener('scroll', () => {
            if (!window.document.querySelector('#repos')) return;
            const {height} = window.document.querySelector('#repos').getBoundingClientRect();
            const windowHeight = profileviews.getBoundingClientRect().height;
            if(profileviews.scrollTop === (height - windowHeight) && !this.endPage) {
                this.getNextPage();
            }
        }, false);
    }
}
</script>