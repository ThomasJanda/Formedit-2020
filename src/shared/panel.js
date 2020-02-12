import utils from './utils'
const global = utils.global()

const panel = {
  new() {
    if(global.App.$store.getters.editorProjectPresent)
    {
      global.App.$prompt('Title of the panel').then( (title) => {
        this.create(title)
      })
    }
    else
      global.App.$alert('Create a project first')
  },
  create(sTitle) {
    global.App.$store.dispatch('editorProjectPanelNew', {
      title: sTitle
    }).then((id) => {
      global.App.$store.dispatch('editorProjectSetPanelSelected', { panelId: id })
    })
  },


  drop(vm, event) {
    let json = event.dataTransfer.getData("text")
    let data = JSON.parse(json)
    let type = data.type
    let elementX = data.elementX
    let elementY = data.elementY

    if(type==="new")
    {
      let iLeft = event.layerX - elementX
      let iTop = event.layerY - elementY

      //find container
      let elContainer = event.target
      let parentId = vm.panelId
      let max=100
      let x=0
      do
      {
        if(elContainer.getAttribute('data-type')==="container")
        {
          //container element
          parentId = elContainer.getAttribute('data-id')
          break
        }
        else if(elContainer.getAttribute('data-type')==="element")
        {
          //element
          iLeft += elContainer.offsetLeft
          iTop += elContainer.offsetTop
        }
        elContainer = elContainer.parentElement
        x++
      } while(max > x)

      let elementId = data.elementId
      let oElement = vm.$store.getters.editorSideBarGetElement(elementId)
      oElement = JSON.parse(JSON.stringify(oElement)) //to loss reaction
      oElement.standard.id = utils.uniqid()
      oElement.standard.parentId=parentId
      oElement.standard.position.type="absolute"
      oElement.standard.position.absolute.left=this.snap(iLeft)
      oElement.standard.position.absolute.top=this.snap(iTop)
      oElement.standard.position.absolute.width = this.snap(oElement.standard.position.absolute.width)
      oElement.standard.position.absolute.height = this.snap(oElement.standard.position.absolute.height)

      vm.$store.dispatch('editorProjectPanelAddElement', {panelId: vm.panelId, element: oElement} ).then(() => {
        vm.$store.dispatch('editorProjectPanelClearElementSelected', { panelId: vm.panelId }).then(() => {
          vm.$store.dispatch('editorProjectPanelSetElementSelected', { panelId: vm.panelId, elementId: oElement.standard.id })
        })
      })
    }
    else if(type==="move")
    {
      let id = data.id
      let iLeft = event.layerX - elementX
      let iTop = event.layerY  - elementY

      //find container
      let elContainer = event.target
      let bIgnoreFirstElement = false
      if(elContainer.getAttribute('data-id')===id)
        bIgnoreFirstElement = true

      let parentId = vm.panelId
      let max=100
      let x=0
      do
      {
        if(elContainer.getAttribute('data-type')==="container" && bIgnoreFirstElement===false)
        {
          //container element
          parentId = elContainer.getAttribute('data-id')
          break
        }
        else // if(elContainer.getAttribute('data-type')==="element" || (elContainer.getAttribute('data-type')==="container" && bIgnoreFirstElement===true))
        {
          //element
          iLeft += elContainer.offsetLeft
          iTop += elContainer.offsetTop
        }
        bIgnoreFirstElement=false
        elContainer = elContainer.parentElement
        x++
      } while(max > x)

      let oElement = vm.$store.getters.editorProjectPanelGetElement(vm.panelId, id)
      oElement = JSON.parse(JSON.stringify(oElement)) //to loss reaction
      oElement.standard.parentId = parentId
      oElement.standard.position.absolute.left = this.snap(iLeft)
      oElement.standard.position.absolute.top = this.snap(iTop)
      oElement.standard.position.absolute.width = this.snap(oElement.standard.position.absolute.width)
      oElement.standard.position.absolute.height = this.snap(oElement.standard.position.absolute.height)

      vm.$store.dispatch('editorProjectPanelReplaceElement', {panelId: vm.panelId, element: oElement} )

    }
    else if(type==="resize")
    {
      let id = data.id

      //find absolute postion of the old element within panel
      let elContainer = null
      let max = null
      let x = null

      elContainer = document.querySelector('div.element[data-id="' + id + '"]')
      let iLeft = 0
      let iTop = 0
      max=100
      x=0
      do
      {
        if(elContainer.getAttribute('data-type')==="container" && elContainer.getAttribute('data-id')===vm.panelId)
        {
          //panel element
          break
        }
        else if(elContainer.getAttribute('data-type')==="element" || (elContainer.getAttribute('data-type')==="container"))
        {
          //element
          iLeft += elContainer.offsetLeft
          iTop += elContainer.offsetTop
        }
        elContainer = elContainer.parentElement
        x++
      } while(max > x)

      //find absolute new position of the sizer within panel
      let iLeftSizer = event.layerX + elementX
      let iTopSizer = event.layerY + elementY

      elContainer = event.target
      max=100
      x=0
      do
      {
        if(elContainer.getAttribute('data-type')==="container" && elContainer.getAttribute('data-id')===vm.panelId)
        {
          //panel element
          break
        }
        else
        {
          //element
          iLeftSizer += elContainer.offsetLeft
          iTopSizer += elContainer.offsetTop
        }
        elContainer = elContainer.parentElement
        x++
      } while(max > x)

      let oElement = vm.$store.getters.editorProjectPanelGetElement(vm.panelId, id)
      oElement = JSON.parse(JSON.stringify(oElement)) //to loss reaction
      oElement.standard.position.absolute.width = this.snap(iLeftSizer - iLeft,10)
      oElement.standard.position.absolute.height = this.snap(iTopSizer - iTop, 10)
      vm.$store.dispatch('editorProjectPanelReplaceElement', {panelId: vm.panelId, element: oElement} )
    }
  },
  snap(iValue, iMin = 0)
  {
    if(iValue < 0) iValue=0
    iValue = Math.round(iValue)
    iValue = Math.round(iValue/10) * 10
    if(iValue < iMin)
      iValue = iMin
    return iValue
  }

}

export default panel
