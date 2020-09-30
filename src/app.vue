<template>
  <div></div>
</template>
<script>
import { fromEvent } from './generators'
export default {
  createStreams() {
    return {
      mouse: fromEvent(document, 'mousemove')
    }
  },
  mounted() {
    this.$streams.mouse.subscribe({
      onData(data){
        console.log('DATA', data)
      }
    })
  }
}
</script>