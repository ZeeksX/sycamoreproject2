<template>
    <img :src="country.flags.svg" class="card-img-top" :alt="country.flags.alt" tabindex="0"/>
</template>
<script>

export default {
    props: {
        country: Object
    }
}
</script>