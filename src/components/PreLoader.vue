<template>
    <div class="preloader">
        <img :src="spinnerSrc" alt="spinner" id="spinner" />
        <h3>Loading...</h3>
        <p>Please Wait</p>
    </div>
</template>

<script>
import { useCountryStore } from '@/store';

export default {
    name: "PreLoader",
    data() {
        return {
            lightSpinnerSrc: "@/assets/Spinner.svg",
            darkSpinnerSrc: "@/assets/darkspinner.svg",
            countryStore: useCountryStore()
        }
    },
    computed: {
        spinnerSrc() {
            return this.countryStore.mode === 'Dark Mode' ? this.lightSpinnerSrc : this.darkSpinnerSrc;
        }
    }
}
</script>
