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
      //find container
      let elContainer = event.target
      let parentId = utils.findFirstParentContainer(vm, elContainer)
      let c = utils.absoluteLeftTopToPanel(elContainer,parentId)
      let iLeft = event.layerX - elementX + c.left
      let iTop = event.layerY - elementY + c.top

      let elementId = data.elementId
      let oElement = vm.$store.getters.editorSideBarGetElement(elementId)
      oElement = JSON.parse(JSON.stringify(oElement)) //to loss reaction
      oElement.standard.id = utils.uniqid()
      oElement.standard.parentId=parentId
      oElement.standard.position.type="absolute"
      oElement.standard.position.absolute.left=utils.snap(iLeft)
      oElement.standard.position.absolute.top=utils.snap(iTop)
      oElement.standard.position.absolute.width = utils.snap(oElement.standard.position.absolute.width)
      oElement.standard.position.absolute.height = utils.snap(oElement.standard.position.absolute.height)

      vm.$store.dispatch('editorProjectPanelAddElement', {panelId: vm.panelId, element: oElement} ).then(() => {
        vm.$store.dispatch('editorProjectPanelClearElementSelected', { panelId: vm.panelId }).then(() => {
          vm.$store.dispatch('editorProjectPanelSetElementSelected', { panelId: vm.panelId, elementId: oElement.standard.id })
        })
      })
    }
    else if(type==="move")
    {
      let id = data.id
      let elContainer = event.target
      let parentId = utils.findFirstParentContainer(vm, elContainer, id)
      let c = utils.absoluteLeftTopToPanel(elContainer,parentId)
      let iLeft = event.layerX - elementX - 10 + c.left
      let iTop = event.layerY  - elementY - 10 + c.top

      let oElement = vm.$store.getters.editorProjectPanelGetElement(vm.panelId, id)
      oElement = JSON.parse(JSON.stringify(oElement)) //to loss reaction
      oElement.standard.parentId = parentId
      oElement.standard.position.absolute.left = utils.snap(iLeft)
      oElement.standard.position.absolute.top = utils.snap(iTop)
      oElement.standard.position.absolute.width = utils.snap(oElement.standard.position.absolute.width)
      oElement.standard.position.absolute.height = utils.snap(oElement.standard.position.absolute.height)

      vm.$store.dispatch('editorProjectPanelReplaceElement', {panelId: vm.panelId, element: oElement} )

    }
    else if(type==="resize")
    {
      let id = data.id

      //find absolute postion of the old element within panel
      let elContainer = document.querySelector('div.element[data-id="' + id + '"]')
      let c = utils.absoluteLeftTopToPanel(elContainer, vm.panelId)
      let iLeft = c.left
      let iTop = c.top

      //find absolute new position of the sizer within panel
      elContainer = event.target
      c = utils.absoluteLeftTopToPanel(elContainer, vm.panelId)
      let iLeftSizer = c.left + event.layerX
      let iTopSizer = c.top + event.layerY

      let oElement = vm.$store.getters.editorProjectPanelGetElement(vm.panelId, id)
      oElement = JSON.parse(JSON.stringify(oElement)) //to loss reaction
      oElement.standard.position.absolute.width = utils.snap(iLeftSizer - iLeft + (10 - elementX),10)
      oElement.standard.position.absolute.height = utils.snap(iTopSizer - iTop + (10 - elementY), 10)
      vm.$store.dispatch('editorProjectPanelReplaceElement', {panelId: vm.panelId, element: oElement} )
    }
  },

  findElementsInRect(vm, iParentId, iParentLeft, iParentTop, iLeft, iTop, iWidth, iHeight)
  {
    let elementsSelected = null
    let r1 = {
      left: iLeft,
      top: iTop,
      right: iLeft + iWidth,
      bottom: iTop + iHeight
    }

    let elements = null
    elements = vm.$store.getters.editorProjectPanelGetElementsAssignedElement(vm.panelId, iParentId)

    if(elements)
    {
      elementsSelected = elements.filter((o) => {
        let r2 = {
          left: iParentLeft + o.standard.position.absolute.left,
          top: iParentTop + o.standard.position.absolute.top,
          right: iParentLeft + o.standard.position.absolute.left + o.standard.position.absolute.width,
          bottom: iParentTop + o.standard.position.absolute.top + o.standard.position.absolute.height
        }
        return utils.intersectRect(r1,r2)
      })
    }

    return elementsSelected
  },
}

export default panel
