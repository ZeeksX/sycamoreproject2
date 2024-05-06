<template>
  <div class="countryCard" :style="applyFlexStyles">
    <div v-for="(country, index) in countryStore.paginatedCountries" :key="index" class="card">
      <router-link :to="{ name: 'Detail', params: { name: country.name.common } }">
        <CardBody :country="country" />
      </router-link>
    </div>
  </div>
</template>

<script>

import { useCountryStore } from '@/store';
import CardBody from './CardBody.vue';
export default {
  components: {
    CardBody
  },
 data() {
  return {
    countryStore: useCountryStore()
  }
 },
  methods: {
    applyFlexStyles() {
      if (this.countryStore.filteredCountries.length < 4 && window.innerWidth >= 1024) {
        return {
          display: 'flex',
          justifyContent: 'flex-start'
        };
      } else {
        return {}; // return empty object if conditions are not met
      }
    }
  },
};
</script>
<style>
a {
  color: hsl(207, 26%, 17%);
  text-decoration: none;
  border-radius: 4px;
}
.card a:focus {
	box-shadow: 0px 0px 4px blue;
	outline: none;
}
.dark-theme .card a:focus{
	box-shadow: 0px 0px 4px #dedede;
	outline: none;
 
}
.dark-theme a {
  color: white;
}
</style>