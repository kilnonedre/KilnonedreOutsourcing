<template>
  <div class="ifflex">
    <div class="seat" :class="{sellOut:insufficientFunds}">{{insufficientFunds?'/':seat.id}}</div>
    <div class="line" v-if="check"></div>
  </div>
</template>

<style scoped>

.seat{
    width: 30px;
    height: 30px;
    border: 1px solid lightblue;
    margin: 5px;
    line-height: 30px;
    text-align: center;
}

.sellOut{
  border: 1px solid red;
}

.ifflex{
  display: flex;
  justify-content: center;
  align-items: center;
}
.line{
  height: 40px;
  border:1px solid black;
  margin: 0 4px;
}

</style>

<script>

export default {
  props:['seat','buyseat','allSeats'],
  name: 'Seat',
  components: {
    // HelloWorld
  },computed:{
    insufficientFunds:function(){
      let flag = false;
      this.buyseat.forEach(element => {
        if (parseInt(this.seat.id)==element){
          flag=!flag;
        }
      });
      return flag;
    },
    check:function(){
      if(this.allSeats[this.allSeats.length/2-1].id==this.seat.id)
      // this.allSeats.indexOf(parseInt(seat.id))==allSeats.length/2
      return true
    }
  }
}
</script>