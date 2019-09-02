<template>
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "Home",
    components:{
      NavBar
    }
  }
</script>

<style scoped>
  .home-nav{
    background: '#ff5777';
  }
</style>
