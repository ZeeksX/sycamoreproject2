<template>
  <div class="countryCard">
    <div v-for="(country, index) in filteredCountries" :key="index" class="card" @click="updateCountries(index)"
      :class="{ selected: selectedIndex === index }" tabindex="0" role="button" :aria-label="country.name.common">
      <div id="contents">
        <button v-if="selectedIndex === index" id="back" aria-label="Go back" tabindex="0">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
          Back
        </button>
        <CountryFlag :country="country"/>
      </div>
      <div v-if="selectedIndex !== index" class="card-body">
        <h1 tabindex="0">{{ country.name.common }}</h1>
        <p tabindex="0"><b>Population: </b>{{ country.population }}</p>
        <p tabindex="0"><b>Region: </b>{{ country.region }}</p>
        <p tabindex="0"><b>Capital: </b>{{ getCapital(country.capital) }}</p>
      </div>
      <div v-else class="detail">
        <div id="detail-body">
          <div id="contents-two">
            <h1 tabindex="0">{{ country.name.common }}</h1>
            <div id="main">
              <div>
                <p tabindex="0"><b>Native Name: </b><span v-html="getNativeName(country)"></span></p>
                <p tabindex="0"><b>Population: </b>{{ country.population }}</p>
                <p tabindex="0"><b>Region: </b>{{ country.region }}</p>
                <p tabindex="0"><b>Sub Region: </b>{{ getSubRegion(country.subregion) }}</p>
                <p tabindex="0"><b>Capital: </b>{{ getCapital(country.capital) }}</p>
              </div>
              <div id="sub">
                <p tabindex="0"><b>Top Level Domain: </b>{{ format(country.tld) }}</p>
                <p tabindex="0"><b>Currencies: </b>{{ getCurrencies(country) }}</p>
                <p tabindex="0"><b>Languages: </b>{{ getLanguages(country) }}</p>
              </div>
            </div>
          </div>
          <footer>
            <div class="footer-buttons">
              <p tabindex="0"><b>Border Countries: </b></p>
              <button v-for="(button, index) in buttons" :key="index" tabindex="0">{{ button }}</button>
            </div>
          </footer>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountryFlag from './CountryFlag.vue';

export default {
  components: {
    CountryFlag
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
    updateCountries(index) {
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
    format(name) {
      if (Array.isArray(name)) {
        return name.join(", ");
      } else {
        return name;
      }
    },
    getSubRegion(country) {
      if (typeof country === "string") {
        return country
      } else {
        return "N/A"
      }
    },
    getNativeName(country) {
      let nativeName = "";
      const nativeNames = country.name.nativeName;
      if (Array.isArray(nativeNames)) {
        const firstItem = nativeNames[0];
        if (firstItem) {
          nativeName = firstItem["official"];
        }
      } else if (typeof nativeNames === "object") {
        const keys = Object.keys(nativeNames);
        const firstKey = keys[0];
        if (firstKey) {
          nativeName = nativeNames[firstKey]["official"];
        }
      } else {
        return "N/A"
      }
      return nativeName;
    },
    getCurrencies(country) {
      let currency = "";
      const currencies = country.currencies;
      if (typeof currencies === "object") {
        const keys = Object.keys(currencies);
        if (keys.length > 0) {
          currency = currencies[keys[0]].name;
        }
        return currency;
      } else {
        return "N/A";
      }
    },
    getLanguages(country) {
      let languages = "";
      const languageObject = country.languages;
      if (typeof languageObject === "object") {
        const keys = Object.keys(languageObject);
        keys.forEach((key, index) => {
          if (index > 0) {
            languages += ", "
          }
          languages += languageObject[key];
        });
      } else {
        return "N/A"
      }
      return languages;
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
  },
};
</script>
