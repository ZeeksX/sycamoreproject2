<template>
  <div class="container">
    <FilterBody @filter="updateFilter" />
    <CardPage :filteredCountries="filteredCountries" :countriesData="countriesData" />
  </div>
</template>

<script>
import FilterBody from './FilterBody.vue';

import CardPage from './CardPage.vue';
export default {
  name: "CountryBody",
  components: {
    CardPage,
    FilterBody,

  },
  data() {
    return {
      countriesData: [],
      filteredCountries: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        if (this.countriesData.length === 0) {
          const response = await fetch("https://restcountries.com/v3.1/all");
          this.countriesData = await response.json();
        }
        this.updateFilter();
      } catch (error) {
        console.error(error);
      }

    },
    updateFilter({ search = "", region = "Filter by Region" } = {}) {
      this.filteredCountries = this.countriesData.filter((country) => {
        const searchMatch = country.name.common.toLowerCase().includes(search.toLowerCase());
        const regionMatch = country.region.toLowerCase().includes(region.toLowerCase());
        return searchMatch || regionMatch;
      });
    },

  },
};
</script>
