<template>
  <div id="app">
    <div class="clearfix">
        <div id="nav">
      <router-link to="/">Timer</router-link> |
      <router-link to="/about">Note</router-link> 
    </div>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
   
  </div>
</template>
<script>
 
  export default{

    created() {
      Notification.requestPermission().then(function(permission) {
          if(permission === 'granted'){
             
          }else if(permission === 'denied'){
             
          }
        });
     
      this.$http.post("http://localhost:56565/check",{}).then((response) => {
          
            if(response.data.includes("Visual Studio Code")){
              alert("cd..")
            }
          })

      setInterval(function(){
        this.$http.post("http://localhost:56565/check",{}).then((response) => {
           
            if(response.data.includes("Visual Studio Code")){
              alert("cd..")
            }
          })
      },1000*60*60*2)
  
    
    },
    
  }
</script>
<style>
*{
  margin:0;
  padding:0
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.clearfix::after{
   clear: both;
  content: "";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
}
#nav {
  padding: 30px;
  float:left
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin:0 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
