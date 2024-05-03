<template>
  <div class="nav">
    <nav class="navbar">
      <div class="navbar-fluid-one">
        <h3 class="navbar-item-one">Where in the world?</h3>
      </div>
      <div class="navbar-fluid-two">
        <i class="bi bi-moon-fill" aria-hidden="true"></i>
        <h3 @click="toggleMode" class="navbar-item-two" tabindex="0" role="button" aria-label="Toggle Dark Mode">{{ mode }}</h3>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      mode: "Dark Mode",
    }
  },
  methods: {
    toggleMode() {
      const lightspinner = document.getElementById('lightspinner')
      this.mode = this.mode === 'Light Mode' ? 'Dark Mode' : 'Light Mode';
      document.body.classList.toggle('dark-theme');
      const announcement = this.mode === 'Light Mode' ? 'Switched to Light Mode' : 'Switched to Dark Mode';
      this.$emit('announce', announcement);
      lightspinner.src ="../assets/darkspinner.svg"
    }
  }
}
</script>

<style scoped>
  
  .navbar-item-two:focus {
    cursor: pointer;
    color: grey;
  }
  .dark-theme .navbar-item-two:focus{
    color: white;
  }
</style>
