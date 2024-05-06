<template>
  <div class="countryCard">
    <div v-for="(country, index) in filteredCountries" :key="index" class="card">
      <router-link :to="{ name: 'Detail', params: { name: country.name.common } }">
        <CardBody :country="country" />
      </router-link>
    </div>
  </div>
</template>

<script>

import CardBody from './CardBody.vue';
export default {
  components: {
    CardBody
  },
  props: {
    filteredCountries: {
      type: Array,
      required: true
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