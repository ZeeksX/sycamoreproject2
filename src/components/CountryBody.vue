<template>
  <div class="container">
    <FilterBody @filter="updateFilter" />
    <CardPage :filteredCountries="paginatedCountries" />
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

  computed: {
    paginatedCountries() {
      const start = (this.countryStore.currentPage - 1) * this.countryStore.perPage;
      const end = start + this.countryStore.perPage;
      return this.countryStore.filteredCountries.slice(start, end);
    },
  },

  mounted() {
    this.updateData();
  },

  methods: {
    async updateData() {
      await this.countryStore.fetchData();
      this.updateFilter();
    },
    updateFilter({ search = '', region = 'Filter by Region' } = {}) {
      this.countryStore.updateFilter({ search, region });
    },
  },
};
</script>
