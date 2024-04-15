<template>
  <div class="countryCard">
    <div v-for="(country, index) in filteredCountries" :key="index" class="card"
      @click="handleCardClick(country, index)" :class="{ selected: selectedIndex === index }" tabindex="0" role="button"
      :aria-label="country.name.common" :to="{ name: 'DetailPage', params: { countryCode: country.code } }">
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
      <DetailPage v-else :country="country"/>
    </div>
  </div>
</template>

<script>
import CountryFlag from './CountryFlag.vue';
import DetailPage from './DetailPage.vue';

export default {
  components: {
    CountryFlag,
    DetailPage
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
    handleCardClick(country, index) {
      const cards = document.querySelectorAll(".card");
      const filter = document.getElementById("filters");
      const screenWidth = window.innerWidth;
      if (this.selectedIndex !== index) {
        this.selectedIndex = index;
        this.buttons = [];
        filter.style.display = "none"
      } else {
        this.selectedIndex = null;
        filter.style.display = "flex"
      }
      this.getBorders(this.filteredCountries[index]);
      cards.forEach((card, i) => {
        if (i !== index) {
          card.style.width = "";
          if (this.selectedIndex === null) {
            card.style.display = "flex";
            if (screenWidth <= 700) {
              filter.style.display = "block";
            } else {
              filter.style.display = "flex";
            }
          } else {
            card.style.display = "none";
            filter.style.display = "none";
          }
        }
      });
    },
    getCapital(country) {
      if (Array.isArray(country)) {
        return country.join(", ");
      } else if (typeof country === "string") {
        return country;
      } else {
        return "N/A";
      }
    },
    getBorders(country) {
      if (country.borders && Array.isArray(country.borders)) {
        country.borders.forEach(borderCode => {
          const borderCountry = this.countriesData.find(c => c.cca3 === borderCode);
          if (borderCountry) {
            this.buttons.push(borderCountry.name.common);
          } else {
            this.buttons.push("N/A");
          }
        });
      } else {
        this.buttons.push("N/A");
      }
    }
  }
};
</script>
