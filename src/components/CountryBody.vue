<template>
  <div class="container">
    <FilterBody />
    <CardPage :filteredCountries="countryStore.paginatedCountries" />
    <PageNav :currentPage="countryStore.currentPage" :totalPages="countryStore.totalPages"
      @changePage="countryStore.changePage" />
      <div id="error-content">
        <h3>Oops...<span style='font-size:100px;'>&#128546;</span></h3>
        <p>No country data found</p>
      </div>
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
#error-content {
  display: none;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}

@media only screen and (min-width: 768px) {
  #error-content {
    display: none;
    justify-content: center;
    align-items: center;
    width: 450px;
    height: 50vh;
    margin: 0 auto;
  }
}
</style>