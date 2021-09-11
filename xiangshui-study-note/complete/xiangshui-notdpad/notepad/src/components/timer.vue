<template>
  <div class="hello">
  
  <div class="countdown-wrap">
    <h4>Countdown</h4>
    <ul class="timer-choose">
      <li @click="generateTimer(0.1)">test</li>

     <li @click="generateTimer(10)">10min</li>
     <li @click="generateTimer(15)">15min</li>
     <li @click="generateTimer(20)">20min</li>
     <li @click="generateTimer(25)">25min</li>
     <li @click="generateTimer(30)">30min</li>
     <li @click="generateTimer(90)">90min</li>
     </ul>
    <timer-control v-on:stop-timer="stoptimer" @refresh="refresh">
      {{formatTime1}}
    </timer-control>
  </div>
 <div>
  <h4>Stopwatch</h4>
  <timer-control v-on:stop-timer="stoptimer2" @refresh="refresh2">
    {{formatTime2}}
    <template v-slot:start>
      <button @click="emit3">start</button>
    </template>
 </timer-control>
 </div>
  </div>
</template>

<script>
  function double(n){
    let str="00"+n
    return str.substring(str.length-2)
  }

  function formatfn(t){
    let h=parseInt(t/3600) 
      let m=parseInt((t%3600)/60)
      let s=t%60
      return double(h)+":"+double(m)+":"+double(s)
  }
import TimerControl from '@/components/TimerControl.vue'
export default {
  name: 'Timer',
  props: {
    msg: String
  },
  components: { TimerControl },
  data() {
    return {
      timer1: null,
      time1:0,
      timer2: null,
      time2:0,
    };
  },
  computed: {
    formatTime1() {
      let t = this.time1/1000;
      return formatfn(t)
    },
    formatTime2() {
      let t = this.time2/1000;
      return formatfn(t)
    },
  
  },
  methods: {
    generateTimer(n) {
      this.time1=n*60*1000
      clearInterval(this.timer1)
      this.timer1=setInterval(()=>{
        this.time1-=1000
        if(this.time1<=100){
          clearInterval(this.timer1)
          new Notification("time",{body:"time is up\ntime is up\ntime is up\n"})
     
          alert("time is up")
        }
       
      },1000)
    },
    stoptimer(){
      clearInterval(this.timer1)
     
    },
    stoptimer2(){
      clearInterval(this.timer2)

    },
    refresh(){
      clearInterval(this.timer1)
      this.time1=0
    },
    refresh2(){
      clearInterval(this.timer2)
      this.timer2=null
      this.time2=0
    },
    emit3(){
      if(this.timer2){
        return;
      }
      this.timer2=setInterval(()=>{
        this.time2+=1000
       },1000)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
h4{
  margin: 40px 0 0;
  padding:5px;
  padding-left:30px;
  color: #42b983;
  text-align: left;
 
}
.timer-choose{
  margin-top: 20px;
}
.timer-choose li{
  cursor: pointer;
}
.timer-choose li:hover{
  color: #42b983;
}
.countdown-wrap{
  border-bottom: 1px solid #42b983;
}
</style>
