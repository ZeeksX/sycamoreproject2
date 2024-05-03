<template>
    <div class="preloader">
        <img :src="spinnerSrc" alt="spinner" id="spinner" />
        <h3>Loading...</h3>
        <p>Please Wait</p>
    </div>
</template>

<script>
import { useCountryStore } from '@/store';
import lightSpinnerSrc from "@/assets/Spinner.svg"
import darkSpinnerSrc from "@/assets/darkspinner.svg"
export default {
    name: "PreLoader",
    data() {
        return {
            countryStore: useCountryStore()
        }
    },
    computed: {
        spinnerSrc() {
            return this.countryStore.mode === 'Dark Mode' ? lightSpinnerSrc : darkSpinnerSrc;
        }
    }
}
</script>
