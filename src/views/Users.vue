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
                                    <div class="lg:w-2/12 md:w-3/12 w-2/12 text-md text-gray-300">
                                        <i class="fa fa-search"></i>
                                    </div>
                                    <div class="lg:w-10/12 md:w-9/12 w-10/12">
                                        <input type="text" class="w-full text-sm py-1 px-1" placeholder="Pesquisar...">
                                    </div> 
                                </div>
                            </div>
                        </section>
                    </section>
                    <hr class="bg-gray-300 md:block hidden" />
                </header>
                <section class="w-full py-2 px-2">
                </section>
            </section>
        </BodyPage>      
    </section>
</template>

<script>
import HeaderGeneric from "./components/HeaderGeneric.vue";
import BodyPage from "./components/BodyPage.vue";

export default {
    name: 'Users',
    components: {
        HeaderGeneric,
        BodyPage
    }
}
</script>