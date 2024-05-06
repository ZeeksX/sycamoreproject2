import { defineStore } from "pinia";

export const useCountryStore = defineStore("country", {
	state: () => ({
		countriesData: [],
		filteredCountries: [],
		perPage: 20,
		currentPage: 1,
		mode: "Dark Mode"
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
		updateFilter({ search = "", region = "" } = {}) {
			this.currentPage =1;
			this.filteredCountries = this.filterBySearch(
				this.filterByRegion(region),
				search
			);
		},
		filterBySearch(countries, search) {
			return countries.filter((country) => {
				return country.name.common.toLowerCase().includes(search.toLowerCase());
			});
		},
		filterByRegion(region) {
			return this.countriesData.filter((country) => {
				return country.region.toLowerCase().includes(region.toLowerCase());
			});
		},
		changePage(page) {
			this.currentPage = page;
		},
		toggleMode() {
			this.mode = this.mode === "Light Mode" ? "Dark Mode" : "Light Mode";
			document.body.classList.toggle("dark-theme");
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
