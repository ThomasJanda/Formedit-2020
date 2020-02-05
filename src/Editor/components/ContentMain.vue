<template>
  <div id="main">
    <div id="contentLeft">
      <side-bar-element @sideBarReload="sideBarElementReload"></side-bar-element>
    </div>
    <sizer-vertical @movement="sizerMovementLeft" @stop="sizerMovementStop"></sizer-vertical>
    <div id="contentMiddle">
      <content-tab v-bind:id="selectedFormId"></content-tab>
    </div>
    <sizer-vertical @movement="sizerMovementRight" @stop="sizerMovementStop"></sizer-vertical>
    <div id="contentRight">
      <side-bar-property @sideBarReload="sideBarPropertyReload"></side-bar-property>
    </div>
  </div>
</template>

<script>
  import SideBarElement from './SideBarElement'
  import SizerVertical from './SizerVertical'
  import SideBarProperty from './SideBarProperty'
  import ContentTab from './ContentTab'
  import store from '../../store'

  export default {
    name: 'ContentMain',
    components: {
      SizerVertical,
      SideBarElement,
      SideBarProperty,
      ContentTab
    },
    data: function () {
      return {
      }
    },
    methods: {
      sideBarElementReload () {
        alert('sideBarElementReload')
      },
      sideBarPropertyReload () {
        alert('sideBarPropertyReload')
      },
      sizerMovementLeft (iMovement) {

        let elLeft = document.querySelector('#contentLeft')
        let elLeftWidth = parseInt(elLeft.offsetWidth) + iMovement

        let elRight = document.querySelector('#contentMiddle')
        let elRightWidth = parseInt(elRight.offsetWidth) + (iMovement * -1)

        if(elLeftWidth > 20 && elRightWidth > 20)
        {
          elLeft.style.width=elLeftWidth + "px"
          elRight.style.width=elRightWidth + "px"
        }
      },
      sizerMovementRight (iMovement) {

        let elLeft = document.querySelector('#contentMiddle')
        let elLeftWidth = parseInt(elLeft.offsetWidth) + iMovement

        let elRight = document.querySelector('#contentRight')
        let elRightWidth = parseInt(elRight.offsetWidth) + (iMovement * -1)

        if(elLeftWidth > 20 && elRightWidth > 20)
        {
          elLeft.style.width=elLeftWidth + "px"
          elRight.style.width=elRightWidth + "px"
        }
      },
      sizerMovementStop() {
        let sizerWidth = 10
        let elLeft = document.querySelector('#contentLeft')
        let elLeftWidth = parseInt(elLeft.offsetWidth)

        let elMiddle = document.querySelector('#contentMiddle')

        let elRight = document.querySelector('#contentRight')
        let elRightWidth = parseInt(elRight.offsetWidth)

        elMiddle.style.width = "calc(100% - " + elLeftWidth + "px - " + elRightWidth + "px - " + (sizerWidth*2) + "px)"
        document.querySelector('#main').style.minWidth = (elLeftWidth + elRightWidth + (sizerWidth*2)) + "px"
      }
    },
    mounted: function () {
      this.sizerMovementStop()
    },
    computed: {
      selectedFormId: () => {
        return store.state.form.selected
      }
    }
  }
</script>

<style scoped lang="scss">
  div#main {
    height: calc(100% - #{$heightHeader});

    > div {
      float: left;
      position: relative;
      height: 100%;
    }

    div#contentLeft {
      width: $widthSideBarLeft;
    }

    div#contentMiddle {
      width: calc(100% - #{$widthSideBarLeft} - #{$widthSideBarRight} - 10px - 10px);
    }

    div#contentRight {
      width: $widthSideBarRight;
    }

  }
</style>
