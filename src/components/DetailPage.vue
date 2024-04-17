<template>
    <div class="contents">
        <button id="back" aria-label="Go back" tabindex="0">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
            Back
        </button>
        <CountryFlag :country="country" />
    </div>
    <div class="detail">
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
        </div>
    </div>

    <footer>
        <div class="footer-buttons">
            <p tabindex="0"><b>Border Countries: </b></p>
            <button v-for="(button) in buttons" :key="button" tabindex="0" @click="handleBorderButtonClick(button)">
                {{ button }}
            </button>
        </div>
    </footer>
</template>

<script>
import CountryFlag from './CountryFlag.vue';
export default {
    props: {
        country: Object,
        buttons: Array
    },
    components: {
        CountryFlag
    },
    emits: ['updateSelectedCountry'],
    methods: {
        handleCardClick(index) {
            const cards = document.querySelectorAll(".card");
            const filter = document.getElementById("filters");
            const screenWidth = window.innerWidth;
            if (this.selectedIndex !== index) {
                this.selectedIndex = index;
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
        getCapital(country) {
            if (Array.isArray(country)) {
                return country.join(", ");
            } else if (typeof country === "string") {
                return country;
            } else {
                return "N/A";
            }
        },
        handleBorderButtonClick(countryName) {
            this.$emit('updateSelectedCountry', countryName);
            this.$emit('preventCardDeselection');
        }
    }
};
</script>
