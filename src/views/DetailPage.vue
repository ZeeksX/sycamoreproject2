<template>
    <div class="home-page">
        <NavBar />
        <div class="container">
            <div class="countryCard">
                <div class="card selected">
                    <div class="contents">
                        <button v-show="getNativeName(country)" id="back" aria-label="Go back" tabindex="0"
                            @click="goBack">
                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                            Back
                        </button>
                        <img :src="country.flags.svg" class="card-img-top" :alt="country.flags.alt" />
                    </div>
                    <div class="detail">
                        <div id="detail-body">
                            <div id="contents-two">
                                <h1>{{ country.name.common }}</h1>
                                <div id="main">
                                    <div>
                                        <p><b>Native Name: </b><span v-html="getNativeName(country)"></span></p>
                                        <p><b>Population: </b>{{ country.population }}</p>
                                        <p><b>Region: </b>{{ country.region }}</p>
                                        <p><b>Sub Region: </b>{{ getSubRegion(country.subregion) }}</p>
                                        <p><b>Capital: </b>{{ getCapital(country.capital) }}</p>
                                    </div>
                                    <div id="sub">
                                        <p><b>Top Level Domain: </b>{{ format(country.tld) }}</p>
                                        <p><b>Currencies: </b>{{ getCurrencies(country) }}</p>
                                        <p><b>Languages: </b>{{ getLanguages(country) }}</p>
                                    </div>
                                </div>
                            </div>
                            <footer>
                                <div class="footer-buttons">
                                    <p><b>Border Countries: </b></p>
                                    <button v-for="(button, index) in buttons" :key="index" tabindex="0"
                                        @click="updateCountryDetails(button)">{{ button
                                        }}</button>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import { useCountryStore } from "@/store/index.js";

export default {
    name: "DetailPage",
    data() {
        return {
            loading: true,
            countryName: "",
            languages: "",
            countryData: null,
            country: null,
            buttons: []
        };
    },
    components: {
        NavBar
    },
    async created() {
        await this.loadData();
    },
    methods: {
        async loadData() {
            const countryName = this.$route.params.name;
            this.country = useCountryStore().countriesData.find(c => c.name.common === countryName);
            if (!this.country) {
                this.countryName = "N/A";
                this.languages = "N/A";
            } else {
                this.countryName = countryName;
                this.getBorders(this.country);
            }
            this.loading = false;
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
        getSubRegion(country) {
            if (typeof country === "string") {
                return country
            } else {
                return "N/A"
            }
        },
        format(name) {
            if (Array.isArray(name)) {
                return name.join(", ");
            } else {
                return name;
            }
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
                return "N/A";
            }
            return languages;
        },
        goBack() {
            window.history.back();
        },
        getBorders(country) {
            if (country.borders && Array.isArray(country.borders)) {
                for (const borderCode of country.borders) {
                    const borderCountry = useCountryStore().countriesData.find(c => c.cca3 === borderCode);
                    if (borderCountry) {
                        this.buttons.push(borderCountry.name.common);
                    } else {
                        this.buttons.push("N/A");
                    }
                }
            } else {
                this.buttons.push("N/A")
            }
            return this.buttons;
        },
        updateCountryDetails(countryName) {
            this.country = useCountryStore().countriesData.find(c => c.name.common === countryName);
        }
    }
};
</script>
<style>
#back:focus {
    outline: none;
    box-shadow: 0px 0px 4px blue;
}

.dark-theme #back:focus {
    box-shadow: 0px 0px 4px #dedede;
}

.footer-buttons button:focus {
    outline: none;
    box-shadow: 0px 0px 4px blue;
}

.dark-theme .footer-buttons button:focus {
    box-shadow: 0px 0px 4px #dedede;
}
</style>
