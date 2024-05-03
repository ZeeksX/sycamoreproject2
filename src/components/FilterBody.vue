<template>
    <div id="filters">
        <form id="form" @submit.prevent="filterCountry">
            <label for="input-field" class="sr-only">Search for a country</label>
            <div id="input-bar">
                <i id="search-icon" class="bi bi-search"></i>
                <input @input="updateCountry" name="searchbar" id="input-field" type="text"
                    placeholder="Search for a country..." aria-label="Search for a country" v-model="search" />
            </div>
        </form>
        <label for="region" class="sr-only">Filter by Region</label>
        <select name="region" id="region" @change="updateRegion" aria-label="Filter by Region">
            <option disabled selected hidden>Filter by Region</option>
            <option v-for="(continent) in Continents" :key="continent" :value="continent">{{ continent }}</option>
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
            Continents: [
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
        },
        updateCountry(event) {
            this.search = event.target.value;
            this.filterCountry();
        },
        updateRegion(event) {
            this.selectedRegion = event.target.value;
            this.filterCountry();
        }
    },
};
</script>
