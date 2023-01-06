<template>
  <div >
    <div class="flexBox">
      <Seat v-for="items in allSeats" :seat="items" :buyseat="buyseat" :allSeats="allSeats"/>
    </div>
    <hr v-if="seats.id==4"/>
  </div>
</template>

<style scoped>

.diii{
  width:20px;
  height:20px;
  background-color:yellow;
}

.flexBox{
  display: flex;
  justify-content: center;
}

hr{
  width: 800px;
}

</style>

<script>
import Seat from "./Seat.vue";

export default {
  props:['seats','buyseat'],
  name: 'Seats',
  components: {
    Seat
  },
  computed:{
    allSeats:function(){
      let seatSingles = [];
      let flag= 0;
      for(let i = 0;i<this.seats.total;i++){
      let seatSingle = {};
        seatSingle.id=i+this.seats.startNumber;
        seatSingles[flag]=seatSingle;
        flag++;
      }
      return seatSingles;
    }
  },
  methods:{

  }
}
</script>