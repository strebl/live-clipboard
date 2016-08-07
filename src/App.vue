<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  background: #3498db;
}

#app {
  border-top: 3px solid #3498db;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
