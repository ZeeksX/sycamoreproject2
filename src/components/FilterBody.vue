<template>
    <div id="filters">
        <form id="form" @submit.prevent="filterCountry">
            <label for="input-field" class="sr-only">Search for a country</label>
            <div id="input-bar">
                <i id="search-icon" class="bi bi-search"></i>
                <input v-model="search" @input="filterCountry" name="searchbar" id="input-field" type="text"
                    placeholder="Search for a country..." aria-label="Search for a country" />
            </div>
        </form>
        <label for="region" class="sr-only">Filter by Region</label>
        <select v-model="selectedRegion" @change="filterCountry" name="region" id="region"
            aria-label="Filter by Region">
            <option disabled value="">Filter by Region</option>
            <option v-for="continent in continents" :key="continent" :value="continent">{{ continent }}</option>
        </select>
    </div>
</template>

<script>
import { useCountryStore } from '@/store';
export default {
    data() {
        return {
            search: "",
            selectedRegion: "",
            continents: [
                "Africa",
                "Americas",
                "Asia",
                "Europe",
                "Oceania",
                "Antarctic",
            ],
            countryStore: useCountryStore()
        };
    },
    methods: {
        filterCountry() {
            this.countryStore.updateFilter({ search: this.search, region: this.selectedRegion });
            this.displayErrorMessage();
        },
        displayErrorMessage() {
            const page = document.getElementById("page");
            const errorImg = document.getElementById("error-image");

            page.style.display = this.countryStore.filteredCountries.length === 0 ? "none" : "flex";
            errorImg.style.display = this.countryStore.filteredCountries.length === 0 ? "flex" : "none";

            if (this.countryStore.filteredCountries.length <= 4) {
                page.style.marginTop = "4.5rem";
            } else if (this.countryStore.filteredCountries.length <= 8) {
                page.style.marginTop = "2rem";
                page.style.justifyContent = "center";
            } else {
                page.style.marginTop = "0rem";
            }
        },
    },
};
</script>
