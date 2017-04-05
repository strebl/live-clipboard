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
  background: #37495c;
}

html {
  height: 100%;
  overflow: auto;
}

body {
  min-height: 100%;
  height: 100%;
  display: flex;
}

#app {
  border-top: 3px solid #3498db;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

.p-t-1 {
  padding-top: 1rem;
}

.p-t-2 {
  padding-top: 2rem;
}

.m-b-1 {
  margin-bottom: 1rem !important;
}
</style>
