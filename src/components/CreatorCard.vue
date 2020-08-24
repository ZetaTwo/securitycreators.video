<template>
  <div class="creator-card">
    <h2>{{creator.name}}</h2>
    <div>{{creator.location}}</div>
    <div class="creator-columns">
      <div class="creator-col-left">
       <div class="creator-avatar"><img v-bind:src="'/img/creators/' + creator.avatar"></div>
       <div class="creator-links">
         <h3>Links</h3>
         <a v-bind:href="link[0]" v-for="(link, index) in creator.links" v-bind:key="index"><i v-bind:class="link[1]"></i></a>
       </div>
       <hr>
       <div class="creator-timezone" v-if="creator.timezone">TZ: {{creator.timezone}}</div>
      </div>
      <div class="creator-col-right">
        <div class="creator-topics" v-if="creator.tags | length">
          <h3>Content</h3>
          <span class="badge badge-light" v-for="(tag, index) in creator.tags" v-bind:key="index">{{tag}}</span>
        </div>
        <hr>
        <div class="creator-schedule" v-if="creator.schedule">
          <h3>Schedule</h3>
          <p>{{creator.schedule}}</p>
        </div>        
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
    border: 4px solid var(--dark-purple);
    border-radius: 30px;
    margin: 20px;
    padding: 15px;
    box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
    background-color: #fcfcfc;
}

.creator-card h3 {
  font-size: 1rem;
}

.creator-columns {
  display: flex;
  width: 100%;
  /*border: 1px solid #000000;*/
  padding: 5px 0;
}

.creator-col-left {
    width: 40%;
    border-width: 0 1px 0 0;
    border-color: #00000;
    border-style: dashed;
    padding: 0 5px;
}

.creator-col-left a {
    color: #222;
    font-size: 1.5rem;
    padding: 2px;
}
.creator-col-left a:hover {
    color: #333;
}

.creator-timezone {
  font-size: 0.8rem;
}

.creator-avatar img {
    max-width: 100%;
}

.creator-col-right {
    width: 60%;
    /*border: 1px solid black;*/
    padding: 0 5px;
}
</style>
