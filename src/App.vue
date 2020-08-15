<template>
  <div id="app">
    <h1>Security Creators</h1>
    <CreatorsFilter />
    <CreatorCards />
  </div>
</template>

<script>
import CreatorsFilter from './components/CreatorsFilter.vue'
import CreatorCards from './components/CreatorCards.vue'

export default {
  name: 'Security Creators',
  components: {
    CreatorsFilter,
    CreatorCards
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
