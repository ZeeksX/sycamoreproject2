<template>
  <div class="container">
    <FilterBody @filter="updateFilter" />
    <CardBody :filteredCountries="filteredCountries" />
  </div>
</template>

<script>
import CardBody from './CardBody.vue';
import FilterBody from './FilterBody.vue';

export default {
  name: "CountryBody",
  components: {
    CardBody,
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
        console.log(error)
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
