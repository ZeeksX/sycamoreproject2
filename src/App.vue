<template>
  <div>
    <HomeView/>
    <RouterView/>
  </div>
    
</template>
<script>
import HomeView from "@/views/HomeView.vue"
export default{
  components:{
    HomeView
  }
}
</script>
