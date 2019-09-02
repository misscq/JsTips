<template>
  <div id="app">
    <router-view />
    <main-tab-bar />
  </div>
</template>

<script>
  import MainTabBar from 'components/content/tabbar/MainTabBar'
  export default {
    name: 'app',
    component:{
      MainTabBar
    }
  }
</script>
