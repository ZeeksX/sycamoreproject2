<template>
    <div class="home-page">
        <NavBar />
        <CountryBody />
    </div>
</template>
<script>
import CountryBody from "@/components/CountryBody.vue";
import NavBar from "@/components/NavBar.vue";
export default {
    name: "HomePage",
    components: {
        NavBar,
        CountryBody
    }
}
</script>