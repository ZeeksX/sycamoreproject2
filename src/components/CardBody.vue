<template>
    <div id="contents">
        <img :src="country.flags.svg" class="card-img-top" :alt="country.flags.alt" />
    </div>
    <div class="card-body">
        <h1>{{ country.name.common }}</h1>
        <p><b>Population: </b>{{ country.population }}</p>
        <p><b>Region: </b>{{ country.region }}</p>
        <p><b>Capital: </b>{{ getCapital(country.capital) }}</p>
    </div>
</template>

<script>
export default {
    name: "CardBody",
    props: {
        country: Object
    },
    methods: {
        getCapital(capital) {
            if (Array.isArray(capital)) {
                return capital.join(", ");
            } else if (typeof capital === "string") {
                return capital;
            } else {
                return "N/A";
            }
        }
    }
};
</script>
