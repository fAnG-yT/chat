<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <keep-alive> -->
      <router-view/>
    <!-- </keep-alive> -->
    
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  background-color:rgba(231, 225, 225, 0.815);
  margin: 0;
}
/* *{
  -webkit-overflow-scrolling: touch;
  overflow-x: touch;
}  */
</style>
