<template>
  <div id="app">
    <stage />
    <Seats v-for="item in this.seatsNumber" :seats="item" :buyseat = "buyseat"/>
    <WriteIn @buySeats="buySeats" />
    <div v-show="buySeat">本次购买的位置为：{{buyseat}}</div>
  </div>
</template>



<script>
import Seats from './components/Seats.vue'
import start from './data/seatsNumber.js'
import WriteIn from './components/button.vue'
import stage from './components/stage.vue'

export default {
  name: 'App',
  data(){
    return{
    seatsNumber: start,
    buySeat:0
    }
  },computed:{
    buyseat:function(){
      let final=[];
      for(let i = 0;i<this.buySeat;i++){
        final[i]=Math.round(Math.random()*190);
        while(final[i]==0){
        final[i]=Math.round(Math.random()*190);
        }
      }
      return final.sort(function(a, b){return a - b});
    }
  },
  components: {
    Seats,
    WriteIn,
    stage
  },
  methods:{
    buySeats(data){
      this.buySeat=parseInt(data);
    }
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
