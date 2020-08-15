<template>
  <div class="creator-card">
    <h2>{{creator.name}}</h2>
    <div>{{creator.location}}</div>
    <div class="creator-columns">
      <div class="creator-col-left">
       <div class="creator-avatar"><img v-bind:src="'/img/creators/' + creator.avatar"></div>
       <div class="creator-links">
         <a v-bind:href="link[0]" v-for="(link, index) in creator.links" v-bind:key="index"><i v-bind:class="link[1]"></i></a>
       </div>
       <div class="creator-timezone">{{creator.timezone}}</div>
      </div>
      <div class="creator-col-right">
        <div class="creator-topics">
          <span class="badge badge-light" v-for="(tag, index) in creator.tags" v-bind:key="index">{{tag}}</span>
        </div>
        <hr>
        <div class="creator-schedule">Schedule: {{creator.schedule}}</div>        
      </div>
    </div>
  </div>
</template>


<script>
export default {
    props: ['creator']
}
</script>

<style>
.creator-card {
    display: inline-block;
    width: 400px;
    /*height: 200px;*/
    border: 1px solid black;
    margin: 20px;
    padding: 10px;
}

.creator-columns {
  display: flex;
  width: 100%;
}

.creator-col-left {
    width: 40%;
    border: 1px solid black;
}

.creator-col-left a {
    color: #222;
    font-size: 1.5rem;
    padding: 2px;
}
.creator-col-left a:hover {
    color: #333;
}

.creator-avatar img {
    max-width: 100%;
}

.creator-col-right {
    width: 60%;
    border: 1px solid black;
}
</style>
