<template>
  <div id="app">
    <h1>Security Creators</h1>
    <!--<CreatorsFilter />-->
    <CreatorCards />
  </div>
</template>

<script>
//import CreatorsFilter from './components/CreatorsFilter.vue'
import CreatorCards from './components/CreatorCards.vue'

export default {
  name: 'Security Creators',
  components: {
    //CreatorsFilter,
    CreatorCards
  }
}
</script>

<style>
:root {
  --mint-cream: #f7fcf6ff;
  --nickel: #6f726dff;
  --solid-pink: #903745ff;
  --copper-crayola: #cd7d5bff;
  --dark-purple: #1f0823ff;
}

body {
    background-color: var(--mint-cream);
}
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--nickel);
  margin-top: 10px;
}
#app h1 {
  font-size: 4rem;
  padding: 5px;
  border-bottom: 1px solid #000;
}
</style>
