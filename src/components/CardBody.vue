<template>
  <div class="countryCard">
    <div v-for="(country, index) in filteredCountries" :key="index" class="card" @click="handleCardClick(country)"
      :class="{ selected: selectedIndex === index }" tabindex="0" role="button" :aria-label="country.name.common">
      <div id="contents">
        <button v-if="selectedIndex === index" id="back" aria-label="Go back" tabindex="0">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
          Back
        </button>
        <CountryFlag v-if="selectedIndex !== index" :country="country" />
      </div>
      <div v-if="selectedIndex !== index" class="card-body">
        <h1 tabindex="0">{{ country.name.common }}</h1>
        <p tabindex="0"><b>Population: </b>{{ country.population }}</p>
        <p tabindex="0"><b>Region: </b>{{ country.region }}</p>
        <p tabindex="0"><b>Capital: </b>{{ getCapital(country.capital) }}</p>
      </div>   
    </div>
  </div>
</template>

<script>
import CountryFlag from './CountryFlag.vue';

export default {
  components: {
    CountryFlag,
  },
  props: {
    filteredCountries: Array,
    countriesData: Array
  },
  data() {
    return {
      selectedIndex: null,
      buttons: []
    };
  },
  methods: {
    handleCardClick(country) {
      // Redirect to detail page with country code as parameter
     this.$router.push({ name: 'DetailPage', params: { countryCode: country } });

    },
    getCapital(country) {
      if (Array.isArray(country)) {
        return country.join(", ");
      } else if (typeof country === "string") {
        return country;
      } else {
        return "N/A";
      }
    }
  }
};
</script>
