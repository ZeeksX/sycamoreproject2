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
        <select id="region" @change="updateRegion" v-model="region" aria-label="Filter by Region">
            <option disabled selected hidden>Filter by Region</option>
            <option v-for="(continent) in Continents" :key="continent">{{ continent }}</option>
        </select>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: "",
            region: "Filter by Region",
            Continents: [
                "Africa",
                "Americas",
                "Asia",
                "Europe",
                "Oceania",
                "Antarctic",
            ],
        };
    },
    methods: {
        filterCountry() {
            this.$emit("filter", { search: this.search, region: this.region });
        },
        updateRegion() {
            this.search = this.region;
            this.filterCountry();
        },
        updateCountry() {
            this.region = "Filter by Region";
            this.filterCountry();
        },
    },
};
</script>
