<template>
  <div class="sizer" @mousedown="mouseDown"></div>
</template>

<script>
  export default {
    name: 'SizerVertical',
    data: function() {
      return {
        isMouseDown: false,
        clientX:0
      }
    },
    methods: {
      mouseDown(event) {
        this.isMouseDown = true
        this.clientX = event.clientX

        document.addEventListener('mouseup', this.mouseUp)
        document.addEventListener('mousemove', this.mouseMove)
      },
      mouseMove(event) {
        if(this.isMouseDown)
        {
          let iMovement = event.clientX - this.clientX
          this.clientX = event.clientX
          this.$emit('movement', iMovement)
        }
      },
      mouseUp() {
        this.isMouseDown = false
        document.removeEventListener('mouseup', this.mouseUp)
        document.removeEventListener('mousemove', this.mouseMove)
        this.$emit('stop')
      }
    }
  }
</script>

<style scoped lang="scss">
  div.sizer {
    float:left;
    position:relative;
    width: 10px;
    height:100%;
    background-color:yellowgreen;
    cursor: ew-resize;
  }
</style>
