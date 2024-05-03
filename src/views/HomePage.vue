<template>
    <div id="preloader" class="preloader" :class="{ 'loader-hidden': isHomePageVisible }">
        <PreLoader />
    </div>
    <div class="home-page" v-show="isHomePageVisible">
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
            isHomePageVisible: false
        };
    },
    mounted() {
        setTimeout(() => {
            this.isHomePageVisible = true;
        }, 1000); // Adjust timing as needed
    }
}
</script>

<style>
.preloader {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 1;
    transition: opacity 0.1s ease-out;
}

.loader-hidden {
    display: none;
    opacity: 0;

}
.home-page{
    transition: 3s ease-in;
}
</style>
