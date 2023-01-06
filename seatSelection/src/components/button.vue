<template>
    <div>
        <input type="number" placeholder="请输入" v-model="seatNumber"  />
        <button @click="watch" :disabled="seatNumber > 10||seatNumber < 1 || !Number.isInteger(parseFloat(seatNumber))">确定</button>
    </div>
</template>

<style scoped>
div{
    padding: 20px 0;
}
</style>

<script>
export default {
    name:"writeIN",
    data(){
        return{
            seatNumber:0
        }
    },
    methods:{
        watch(){
            this.$emit('buySeats',this.seatNumber);
        }
    }
}
</script>