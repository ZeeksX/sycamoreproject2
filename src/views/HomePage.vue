<template>
  <div>
    <div id="preloader" class="preloader" :class="{ 'loader-hidden': !isLoading}">
      <PreLoader />
    </div>
    <div class="home-page" v-show="isHomePageVisible && !isLoading">
      <NavBar />
      <CountryBody />
    </div>
  </div>
</template>

<script>
import { useCountryStore } from "@/store";
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
  computed: {
    isLoading() {
      return useCountryStore().countriesData.length < 250;
    }
  },
  mounted() {
    this.fetchCountriesData();
  },
  methods: {
    fetchCountriesData() {
      if (useCountryStore().countriesData.length < 250) {
        useCountryStore().fetchData();
      }
      this.isHomePageVisible = true;
    }
  }
};
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
 
}
.loader-hidden {
  display: none;
  opacity: 0;
}
.home-page{
    transition: 3s ease-in
}
</style>