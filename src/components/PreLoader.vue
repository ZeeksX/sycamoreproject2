<template>
    <div class="preloader">
        <img src="../assets/Spinner.svg"/>
        <h3>Loading...</h3>
        <p>Please Wait </p>
    </div>
</template>
<script>
export default{
    name: "PreLoader"
}
</script>
<style>
.dark-theme .preloader{
    background-color:  hsl(207, 26%, 17%);
}
</style>
