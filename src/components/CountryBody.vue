<template>
  <div class="container">
    <FilterBody @filter="updateFilter" />
    <CardBody :filteredCountries="paginatedCountries" :perPage="perPage" :countriesData="countriesData" />
    <div v-if="!isCardSelected">
      <nav aria-label="Page navigation ">
        <ul class="pagination align-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
          </li>
        </ul>
      </nav>
    </div>
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
      perPage: 20,
      currentPage: 1,
      selectedIndex: null
    };
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
    isCardSelected() {
      return this.selectedIndex !== null;
    }
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
        console.error(error)
      }
    },
    updateFilter({ search = "", region = "Filter by Region" } = {}) {
      this.filteredCountries = this.countriesData.filter((country) => {
        const searchMatch = country.name.common.toLowerCase().includes(search.toLowerCase());
        const regionMatch = country.region.toLowerCase().includes(region.toLowerCase());
        return searchMatch || regionMatch;
      });
      this.currentPage = 1; 
      this.selectedIndex = null; 
    },
    changePage(page) {
      this.currentPage = page;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>
<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}
</style>