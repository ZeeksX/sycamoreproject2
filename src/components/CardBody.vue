<template>
  <div class="countryCard">
    <div v-for="(country, index) in filteredCountries" :key="index" class="card" @click="updateCountries(index)"
      :class="{ selected: selectedIndex === index }" tabindex="0" role="button" :aria-label="country.name.common">
      <div id="contents">
        <button v-if="selectedIndex === index" id="back" aria-label="Go back" tabindex="0">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
          Back
        </button>
        <img :src="country.flags.svg" class="card-img-top" :alt="country.flags.alt" tabindex="0" />
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
export default {
  props: {
    filteredCountries: Array,
  },
  data() {
    return {
      selectedIndex: null,
      buttons: []
    };
  },
  methods: {
    updateCountries(index) {
      if (this.selectedIndex !== index) {
        this.selectedIndex = index;
        const filterBody = document.querySelector("#filters");
        if (filterBody) {
          filterBody.style.display = "none";
        }
      } else {
        this.selectedIndex = null;
      }
      this.getBorders(this.filteredCountries[index]);
      const cards = document.querySelectorAll(".card");
      const filter = document.getElementById("filters");
      const screenWidth = window.innerWidth;
      cards.forEach((card, i) => {
        if (i !== index) {
          card.style.width = "";
          if (this.selectedIndex === null) {
            card.style.display = "flex";
            filter.style.display = screenWidth <= 700 ? "block" : "flex";
          } else {
            card.style.display = "none";
            filter.style.display = "none";
          }
        }
      });
    },

    getCapital(country) {
      return Array.isArray(country) ? country.join(", ") : typeof country === "string" ? country : "N/A";
    },
    getBorders(country) {
      this.buttons = [];
      if (country && country.borders) {
        country.borders.forEach(borderCode => {
          const borderCountry = this.filteredCountries.find(country => country.cca3 === borderCode);
          this.buttons.push(borderCountry ? borderCountry.name.common : "N/A");
        });
      } else {
        this.buttons.push("N/A");
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
        return country;
      } else {
        return "N/A";
      }
    },
    getNativeName(country) {
      let nativeName = "";
      const nativeNames = country.name.nativeName;
      if (Array.isArray(nativeNames) && nativeNames.length > 0) {
        nativeName = nativeNames[0].official;
      } else if (typeof nativeNames === "object") {
        const firstKey = Object.keys(nativeNames)[0];
        if (firstKey) {
          nativeName = nativeNames[firstKey].official;
        }
      }
      return nativeName || "N/A";
    },
    getCurrencies(country) {
      if (country.currencies) {
        const currency = country.currencies[Object.keys(country.currencies)[0]];
        return currency ? currency.name : "N/A";
      }
      return "N/A";
    },
    getLanguages(country) {
      if (country.languages) {
        return Object.values(country.languages).join(", ") || "N/A";
      }
      return "N/A";
    },
  },
};
</script>
