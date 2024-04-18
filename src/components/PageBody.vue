<template>
    <div>
        <nav aria-label="Page navigation">
            <ul class="pagination align-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>

export default {
    name: "PageBody",
    props: {
        filteredCountries: {
            type: Array,
            required: true
        },
        countriesData: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            perPage: 20,
            currentPage: 1,
            selectedCountry: null,
        };
    },
    computed: {
        paginatedCountries() {
            if (!this.filteredCountries || this.filteredCountries.length === 0) {
                return [];
            }
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.filteredCountries.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredCountries.length / this.perPage);
        },
        isCardSelected() {
            return this.selectedIndex !== null;
        }
    },
    methods: {
        handleCardClick(index) {
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
        showDetail(country) {
            this.selectedCountry = country;
        },
        changePage(page) {
            this.currentPage = page;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
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
    },
};
</script>
