<template>
    <div class="home-page">
        <NavBar />
        <CountryBody />
    </div>
</template>
<script>
import CountryBody from "./CountryBody.vue";
import NavBar from "./NavBar.vue";
export default {
    name: "HomePage",
    components: {
        NavBar,
        CountryBody
    }
}
</script>