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
            this.displayErrorMessage();
        },
        updateCountry(event) {
            this.search = event.target.value;
            this.filterCountry();
        },
        updateRegion(event) {
            this.selectedRegion = event.target.value;
            this.filterCountry();
        },
        displayErrorMessage() {
            const page = document.getElementById("page")
            const errorImg = document.getElementById("error-image")
           
            if (this.countryStore.filteredCountries.length === 0) {
                console.error("No country found")
                page.style.display="none"
                errorImg.style.display="flex"
            } else if(this.countryStore.filteredCountries.length <= 4){
                page.style.marginTop = "4.5rem"
                page.style.display ="flex"
                errorImg.style.display ="none"
            } 
            else if (this.countryStore.filteredCountries.length <= 8){
                page.style.marginTop ="2rem"
                page.style.justifyContent="center"
                errorImg.style.display ="none"
                page.style.display="flex"
            } else{
                errorImg.style.display="none"
                page.style.display="flex"
                page.style.marginTop ="0rem"
                
            }

        },
    },
};
</script>
