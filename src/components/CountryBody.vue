<template>
  <div class="container">
    <FilterBody @filter="updateFilter" />
    <CardPage :filteredCountries="paginatedCountries" :countriesData="countriesData" />
    <PageNav :currentPage="currentPage" :totalPages="totalPages" @changePage="changePage" />
  </div>
</template>

<script>
import FilterBody from './FilterBody.vue';
import PageNav from './PageNav.vue';
import CardPage from './CardPage.vue';

export default {
  name: 'CountryBody',
  components: {
    CardPage,
    FilterBody,
    PageNav,
  },
  data() {
    return {
      countriesData: [],
      filteredCountries: [],
      perPage: 20,
      currentPage: 1,

    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    paginatedCountries() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredCountries.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredCountries.length / this.perPage);
    },
  },
  methods: {
    async getData() {
      try {
        if (this.countriesData.length === 0) {
          const response = await fetch('https://restcountries.com/v3.1/all');
          this.countriesData = await response.json();
        }
        this.updateFilter();
      } catch (error) {
        console.error(error);
      }
    },
    updateFilter({ search = '', region = 'Filter by Region' } = {}) {
      this.filteredCountries = this.countriesData.filter((country) => {
        const searchMatch = country.name.common.toLowerCase().includes(search.toLowerCase());
        const regionMatch = country.region.toLowerCase().includes(region.toLowerCase());
        return searchMatch || regionMatch;
      });
      this.currentPage = 1; // Reset current page when filter is updated
    },
    changePage(page) {
      this.currentPage = page;
    },
  },

};
</script>
