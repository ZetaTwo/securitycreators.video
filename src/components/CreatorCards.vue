<template>
  <div class="creator-cards">
    <CreatorCard v-for="(creator, index) in creators" v-bind:creator="creator" v-bind:key="index" />
  </div>
</template>


<script>
import creators from '@/assets/data/creators.json'
import CreatorCard from './CreatorCard.vue'

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
  components: {
    CreatorCard
  },
  data: function() { 
    return {
      creators: creators
    }
  }
}
</script>

<style>
.creator-cards {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    align-items: flext-start;
}
</style>
