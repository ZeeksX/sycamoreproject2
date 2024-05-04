<template>
  <div class="container">
    <FilterBody />
    <CardPage :filteredCountries="countryStore.paginatedCountries" />
    <PageNav :currentPage="countryStore.currentPage" :totalPages="countryStore.totalPages"
      @changePage="countryStore.changePage" />
    <img src="../assets/error-image.svg" alt="error-image" id="error-image" />
  </div>
</template>

<script>
import { useCountryStore } from '@/store/index.js';
import FilterBody from './FilterBody.vue';
import CardPage from './CardPage.vue';
import PageNav from './PageNav.vue';

export default {
  name: 'CountryBody',

  components: {
    FilterBody,
    CardPage,
    PageNav
  },

  data() {
    return {
      countryStore: useCountryStore(),
    };
  },
  mounted() {
    this.countryStore.fetchData();
  },
};
</script>
<style>
#error-image {
  display: none;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}

@media only screen and (min-width: 768px) {
  #error-image {
    display: none;
    justify-content: center;
    align-items: center;
    width: 450px;
    height: 50%;
    margin: 0 auto;
  }
}
</style>