<template>
  <div id="app">
    <header><h1>Security Creators</h1></header>
    <!--<CreatorsFilter />-->
    <CreatorCards v-bind:creators="creators_en" />
    <h2>Non-English creators</h2>
    <CreatorCards v-bind:creators="creators_int" />
    <SiteFooter />
  </div>
</template>

<script>
//import CreatorsFilter from './components/CreatorsFilter.vue'
import creators from '@/assets/data/creators.json'
import CreatorCards from './components/CreatorCards.vue'
import SiteFooter from './components/SiteFooter.vue'

// LFSR as a simple seedable PRNG
let value = Math.floor(Date.now()/1000/60/60)&0xFFFF;
let tap1bit = 1;
let tap2bit = 9;
function lfsr_random() {
  // taken from https://github.com/kirbysayshi/tetris-prng
  let tap1val = (value >> tap1bit) & 1;
  let tap2val = (value >> tap2bit) & 1;
  let leftmostBit = tap1val ^ tap2val;
  value = ((leftmostBit << 15) | (value >>> 1)) >>> 0;
  return value / (2 ** 16);
}

// Shuffle creators ordering every hour
for(let i = creators.length - 1; i > 0; i--){
  const j = Math.floor(lfsr_random() * i)
  const temp = creators[i]
  creators[i] = creators[j]
  creators[j] = temp
}

export default {
  name: 'SecurityCreators',
  components: {
    //CreatorsFilter,
    CreatorCards,
    SiteFooter
  },
  data: function() { 
    return {
      creators_en: creators.filter(x => !x.language),
      creators_int: creators.filter(x => x.language)
    }
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
