<template>
  <div class="home">
  
    <timer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Timer from '@/components/timer.vue'

export default {
  name: 'Home',
  components: {
    Timer
  }
}
</script>
