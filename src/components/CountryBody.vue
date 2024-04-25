<template>
  <div class="container">
    <FilterBody @filter="updateFilter" />
    <CardPage :filteredCountries="filteredCountries" />
  </div>
</template>

<script>
import { useCountryStore } from '@/store/index.js'; 
import FilterBody from './FilterBody.vue';
import CardPage from './CardPage.vue';


export default {
  name: 'CountryBody',
  components: {
    FilterBody,
    CardPage,
  },
  
  data() {
    return {
      countryStore: useCountryStore(),
    };
  },

  computed: {
    filteredCountries() {
      return this.countryStore.filteredCountries;
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
