<template>
  <div id="main">
    <div id="contentLeft">
      <side-bar-element @sideBarReload="sideBarElementReload"></side-bar-element>
    </div>
    <sizer-vertical id="sizerLeft" @movement="sizerMovementLeft" @stop="sizerMovementStop"></sizer-vertical>
    <div id="contentMiddle">
      <content-tab v-if="selectedPanelId!==null" v-bind:panelId="selectedPanelId"/>
    </div>
    <sizer-vertical id="sizerRight" @movement="sizerMovementRight" @stop="sizerMovementStop"></sizer-vertical>
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

  export default {
    name: 'ContentMain',
    components: {
      SizerVertical,
      SideBarElement,
      SideBarProperty,
      ContentTab
    },
    props: {
      showSideBarLeft: {
        type:Boolean,
        default: true
      },
      showSideBarRight: {
        type:Boolean,
        default: true
      }
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
        if(elLeft.style.display==="none")
          elLeftWidth=0
        else
          elLeftWidth+=sizerWidth

        let elMiddle = document.querySelector('#contentMiddle')

        let elRight = document.querySelector('#contentRight')
        let elRightWidth = parseInt(elRight.offsetWidth)
        if(elRight.style.display==="none")
          elRightWidth=0
        else
          elRightWidth+=sizerWidth

        elMiddle.style.width = "calc(100% - " + elLeftWidth + "px - " + elRightWidth + "px)"
        document.querySelector('#main').style.minWidth = (elLeftWidth + elRightWidth) + "px"
      },
      toggleSideBar() {
        let display=""
        display = this.showSideBarLeft?'block':'none'
        document.querySelector('#contentLeft').style.display=display
        document.querySelector('#sizerLeft').style.display=display

        display = this.showSideBarRight?'block':'none'
        document.querySelector('#contentRight').style.display=display
        document.querySelector('#sizerRight').style.display=display

        this.sizerMovementStop()
      }
    },
    mounted: function () {
      this.sizerMovementStop()
    },
    computed: {
      selectedPanelId() {
        return this.$store.getters.editorProjectGetPanelSelectedId
      }
    },
    watch: {
      showSideBarLeft() {
        this.toggleSideBar()
      },
      showSideBarRight() {
        this.toggleSideBar()
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
