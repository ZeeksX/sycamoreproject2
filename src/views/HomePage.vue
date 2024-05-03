<template>
    <div id="preloader" class="preloader" :class="{ 'loader-hidden': !preloaderVisible }">
        <PreLoader/>
    </div>
    <div class="home-page" v-show="homePageVisible">
        <NavBar />
        <CountryBody />
    </div>
</template>

<script>
import CountryBody from "@/components/CountryBody.vue";
import NavBar from "@/components/NavBar.vue";
import PreLoader from "@/components/PreLoader.vue";
export default {
    name: "HomePage",
    components: {
        NavBar,
        CountryBody,
        PreLoader
    },
    data() {
        return {
            preloaderVisible: true,
            homePageVisible: false
        };
    },
    mounted() {
        this.displayLoader();
    },
    methods: {
        displayLoader() {
            window.addEventListener("load", () => {
                const loader = document.getElementById("preloader");
                loader.classList.add("loader-hidden");
                loader.addEventListener('transitionend', () => {
                    loader.parentNode.removeChild(loader);
                    this.showHomePage();
                });
            });
        },
        showHomePage() {
            this.homePageVisible = true;
        }
    },
}
</script>

<style>
.preloader {
    width: 100%;
    height: 100%;
    z-index: 9999999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: opacity 3s ease-out;
}

.loader-hidden {
    opacity: 0;
    pointer-events: none;
}
</style>
