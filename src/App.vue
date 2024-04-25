<template>
  <div>
    <RouterView/>
  </div>
</template>

<script>
import router from './router';

export default {
  name: "App",
  router,
  
};
</script>
