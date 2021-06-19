<template>
  <div class="creator-cards">
    <CreatorCard v-for="(creator, index) in creators" v-bind:creator="creator" v-bind:key="index" />
  </div>
</template>


<script>
import CreatorCard from './CreatorCard.vue'

export default {
  components: {
    CreatorCard
  },
  props: ['creators'],
  data: function() { 
    return {
      international: false,
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
