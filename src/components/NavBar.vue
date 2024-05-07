<template>
  <div class="nav">
    <nav class="navbar">
      <div class="navbar-fluid-one">
        <h3 class="navbar-item-one">Where in the world?</h3>
      </div>
      <div class="navbar-fluid-two" @click="countryStore.toggleMode">
        <i class="bi bi-moon-fill" aria-hidden="true"></i>
        <h3 @keydown.enter="countryStore.toggleMode" class="navbar-item-two" tabindex="0" role="button" aria-label="Toggle Dark Mode">{{ countryStore.mode }}</h3>
      </div>
    </nav>
  </div>
</template>

<script>
import { useCountryStore } from '@/store';
export default {
  name: 'NavBar',
  data() {
    return {
      countryStore: useCountryStore()
    }
  },
}
</script>

<style scoped>
  .navbar-fluid-two i:hover{
    cursor: pointer;
  }
  .navbar-item-two:focus {
    cursor: pointer;
    color: grey;
  }
  .dark-theme .navbar-item-two:focus{
    color: white;
  }
</style>
