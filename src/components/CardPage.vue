<template>
  <div class="countryCard">
    <div v-for="(country, index) in filteredCountries" :key="index" class="card" @click="handleCardClick(index)"
      :class="{ selected: selectedIndex === index }" tabindex="0" role="button" :aria-label="country.name.common">
      <CardBody v-if="selectedIndex !== index" :country="country" />
      <DetailPage v-else :country="country" :buttons="buttons" />
    </div>
  </div>
</template>

<script>
import CardBody from './CardBody.vue';
import DetailPage from './DetailPage.vue';

export default {
  components: {
    DetailPage,
    CardBody
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
    handleCardClick(index) {
      const cards = document.querySelectorAll(".card");
      const filter = document.getElementById("filters");
      const screenWidth = window.innerWidth;
      if (this.selectedIndex !== index) {
        this.selectedIndex = index;
        this.buttons = [];
        filter.style.display = "none";
      } else {
        this.selectedIndex = null;
        filter.style.display = "flex";
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
