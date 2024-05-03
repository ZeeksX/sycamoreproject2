<template>
  <div class="container">
    <FilterBody/>
    <CardPage :filteredCountries="countryStore.paginatedCountries" />
    <PageNav :currentPage="countryStore.currentPage" :totalPages="countryStore.totalPages"
      @changePage="countryStore.changePage" />
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
    this.countryStore.fetchData()
  },
};
</script>
