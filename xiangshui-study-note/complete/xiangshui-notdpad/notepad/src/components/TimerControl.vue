<template>
    <div class="timer-wrap">
        <div class="timer">
            <slot></slot>
          </div>
          <div class="btn-area">
            <button @click="emit1">re</button>
            <slot name="start">
            </slot> 
            
            <button @click="emit">stop</button>
          </div>
    </div>
</template>



<script>
export default {
    name: 'CopyTimercontrol',




    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
       emit(){
         this.$emit('stop-timer');
       },
       emit1(){
         this.$emit('refresh');
       },
      
    },
};
</script>

<style scoped>
    .timer{
  margin-top: 15px;
  font-size: 25px;
  font-weight: bold;
 
}
.timer-wrap{
    padding-bottom: 30px;
 
}
.btn-area{
  margin-top: 15px;
 
}
.btn-area button{
  padding: 5px 10px;
  font-size: 20px;
 
}
.btn-area button:nth-child(1){
  margin-right: 5px;
}
</style>