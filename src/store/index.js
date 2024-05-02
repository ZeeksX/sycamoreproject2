import { defineStore } from "pinia";

export const useCountryStore = defineStore("country", {
  state: () => ({
    countriesData: [],
    filteredCountries: [],
    perPage: 20,
    currentPage: 1,
  }),

  actions: {
    async fetchData() {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        this.countriesData = await response.json();
        this.filteredCountries = this.countriesData;
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
    changePage(page) {
      this.currentPage = page;
    },
  },

  getters: {
    paginatedCountries() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredCountries.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredCountries.length / this.perPage);
    },
  },
});
