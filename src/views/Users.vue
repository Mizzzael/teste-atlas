<template>
    <section id=users class="w-full">
        <HeaderGeneric title="Lista de Usuários" /> 
        <BodyPage>
            <section class="w-full md:py-2 px-4">
                <header class="w-full mx-auto">
                    <hr class="mx-auto block md:hidden w-full" />
                    <section class="w-full md:p-6 px-2 py-4 flex flex-wrap items-center justify-center">
                        <section class="w-6/12 md:block hidden">
                            <h4 class="text-2xl font-bold">
                                Search Results 
                            </h4>
                        </section>
                        <section class="md:w-6/12 w-full flex md:justify-end justify-center">
                            <div class="md:w-8/12 w-full shadow rounded-sm px-2 py-1">
                                <div class="w-full flex flex-wrap justify-center items-center">
                                    <div class="xl:w-1/12 lg:w-2/12 md:w-3/12 w-1/12 text-md text-gray-300">
                                        <i class="fa fa-search"></i>
                                    </div>
                                    <form class="xl:w-11/12 lg:w-10/12 md:w-9/12 w-11/12">
                                        <input v-on:keyup="getUsers()" v-model="search" type="text" class="w-full text-sm py-1 px-1" placeholder="Pesquisar...">
                                    </form> 
                                </div>
                            </div>
                        </section>
                    </section>
                    <hr class="bg-gray-300 md:block hidden" />
                </header>
                <section class="w-full md:py-8 pb-8 px-2">
                    <section id=scrollSearch v-if="users.length" class="md:w-11/12 mx-auto flex flex-wrap justify-start items-center">
                        <Thumb v-for="(user, index) in users" :key="'thumb-'+index" :user="user" />
                    </section>
                    <section v-if="users.length && pageNumber && query.page === 1" class="w-full text-center md:block hidden">
                        <button v-on:click="getNextPage()" class="mx-auto text-md inline-block my-4 py-2 md:w-4/12 w-8/12 text-white bg-gray-300 rounded-sm">
                            Mais Usuários
                        </button>
                    </section>
                    <section v-if="loading" class="md:w-5/12 w-6/12 mx-auto">
                        <Loading />
                    </section>
                    <section v-if="!users.length && !loading" class="md:w-5/12 w-6/12 mx-auto">
                        <Empty />
                    </section>
                </section>
            </section>
        </BodyPage>      
    </section>
</template>

<script>
import { mapGetters } from "vuex"
import HeaderGeneric from "../components/HeaderGeneric.vue"
import BodyPage from "../components/BodyPage.vue"
import Thumb from "../components/UsersThumb.vue"
import Loading from "../components/Loading.vue"
import Empty from "../components/Empty.vue"
import Github from "../assets/js/Github.js"
// Teste import ProdutsTeste from "../assets/js/teste.js"
const github_api = new Github();

let keyupTimeout = false;
export default {
    name: 'Users',
    data() {
        return {
            search: '',
            users: [],
            pageNumber: 0,
            query: {
                search: '',
                page: 1,
                per_page: 10
            },
            loading: false
        }
    },
    methods: {
        prepareQuery(search, page) {
            this.query.search = search;
            this.query.page = page;
        },
        makeQuery(query, callback=function(){}) {
            github_api.getUsers(query).then(({data}) => {
                this.users = [...this.users, ...data.items];
                this.pageNumber = Math.round(parseInt(data.total_count) / 10);
                callback(data);
            });            
        },
        getNextPage() {
            if(this.query.page === this.pageNumber) {
                return;
            }
            this.loading = true;
            this.query.page += 1;
            this.makeQuery(this.query, () => {
                this.loading = false;
            });
        },
        getUsers() {
            this.users = [];
            this.loading = true;
            if(keyupTimeout) clearTimeout(keyupTimeout);
            if(!this.search) {
                this.loading = false;
                return;
            }
            keyupTimeout = setTimeout(() => {
                this.prepareQuery(this.search, 1);
                this.makeQuery(this.query, () => {
                    this.loading = false;
                });
                keyupTimeout = false;
            }, 3000);
        }
    },
    computed: {
        ...mapGetters([
            'getSearch'
        ])
    },
    mounted() {
        this.search = this.getSearch;
        if(this.search) {
            this.prepareQuery(this.search, 1);
            this.makeQuery(this.query)
        };

        window.addEventListener('scroll', () => {
            const {height} = window.document.querySelector('html').getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if(window.scrollY === (height - windowHeight)) {
                this.getNextPage();
            }
        }, false);
    },
    components: {
        HeaderGeneric,
        BodyPage,
        Thumb,
        Loading,
        Empty
    }
}
</script>