import Vuex from 'vuex'
import Vue from 'vue'
import utils from './../shared/utils'
Vue.use(Vuex)

const developmentMode = true

//example data
const developmentStore = {

  test: 'yes',

  editor: {
    /* contain all information the editor need */
    selectedPanelId: null, /* current selected panel */
    selectedElements: [
      {
        panelId: 'id',
        elements: ['el1', 'el2']
      }
    ], /* selected elements */

    /* all elements present in the system */
    elements: [
      { /* defintion of one element */
        standard: { /* properties nessesary in editor and interpreter mode */
          elementId: 'rs.form', /* unique id, identifier from the manufacturer of the element */
          id: '', /* unique id, identify the element exact at runtime like html attribute id */
          parentId: '', /* id of the element/form the element has to render in  */
          title: 'Form', /* title of the element like "Text box" */
          type: 'container', /* element/container */
          position: { /* how should the element position? */
            type: 'absolute',
            absolute: {
              left: 0,
              top: 0,
              width: 200,
              height: 200
            }
          }
        },
        editor: /* all properties nessesary in editor mode */
          {
            sideBar: { /* information for the sideBar in the editor */
              group: 'Form',
              visible: true,
              backgroundColor: 'lightyellow',
              foregroundColor: 'black',
              title: "Form"
            },
            panel: { /* information for the form panel in the editor */
              backgroundColor: 'lightyellow',
              foregroundColor: 'black',
              title: "Form"
            },
          },
        properties: //all properties the user can edit in the editor and use during runtime
        {}
      },
      { /* defintion of one element */
        standard: { /* properties nessesary in editor and interpreter mode */
          elementId: 'rs.label', /* unique id, identifier from the manufacturer of the element */
          id: '', /* unique id, identify the element exact at runtime like html attribute id */
          parentId: '', /* id of the element/form the element has to render in  */
          title: 'Label', /* title of the element like "Text box" */
          type: 'element', /* element/container */
          position: { /* how should the element position? */
            type: 'absolute',
            absolute: {
              left: 0,
              top: 0,
              width: 200,
              height: 25
            }
          }
        },
        editor: /* all properties nessesary in editor mode */
          {
            sideBar: { /* information for the sideBar in the editor */
              group: 'Style',
              visible: true,
              backgroundColor: 'lightyellow',
              foregroundColor: 'black',
              title: "Label"
            },
            panel: { /* information for the form panel in the editor */
              backgroundColor: 'lightyellow',
              foregroundColor: 'black',
              title: "Label"
            },
          },
          properties: //all properties the user can edit in the editor and use during runtime
          {}
      },
      { /* defintion of one element */
        standard: { /* properties nessesary in editor and interpreter mode */
          elementId: 'rs.textbox', /* unique id, identifier from the manufacturer of the element */
          id: '', /* unique id, identify the element exact at runtime like html attribute id */
          parentId: '', /* id of the element/form the element has to render in  */
          title: 'Textbox', /* title of the element like "Text box" */
          type: 'element', /* element/container */
          position: { /* how should the element position? */
            type: 'absolute',
            absolute: {
              left: 0,
              top: 0,
              width: 200,
              height: 25
            }
          }
        },
        editor: /* all properties nessesary in editor mode */
          {
            sideBar: { /* information for the sideBar in the editor */
              group: 'Form',
              visible: true,
              backgroundColor: 'lightyellow',
              foregroundColor: 'black',
              title: "Textbox"
            },
            panel: { /* information for the form panel in the editor */
              backgroundColor: 'lightyellow',
              foregroundColor: 'black',
              title: "Textbox"
            },
          },
        properties: //all properties the user can edit in the editor and use during runtime
          {}
      },
      { /* defintion of one element */
        standard: { /* properties nessesary in editor and interpreter mode */
          elementId: 'rs.checkbox', /* unique id, identifier from the manufacturer of the element */
          id: '', /* unique id, identify the element exact at runtime like html attribute id */
          parentId: '', /* id of the element/form the element has to render in  */
          title: 'checkbox', /* title of the element like "Text box" */
          type: 'element', /* element/container */
          position: { /* how should the element position? */
            type: 'absolute',
            absolute: {
              left: 0,
              top: 0,
              width: 200,
              height: 25
            }
          }
        },
        editor: /* all properties nessesary in editor mode */
          {
            sideBar: { /* information for the sideBar in the editor */
              group: 'Form',
              visible: true,
              backgroundColor: 'lightyellow',
              foregroundColor: 'black',
              title: "Checkbox"
            },
            panel: { /* information for the form panel in the editor */
              backgroundColor: 'lightyellow',
              foregroundColor: 'black',
              title: "Checkbox"
            },
          },
        properties: //all properties the user can edit in the editor and use during runtime
        {}
      }
    ]
  },

  /* all information about the current project */
  project: null
}

const store = new Vuex.Store({
  devtools: developmentMode,
  state: () => { return (developmentMode ? developmentStore : {}) }, // = data


  mutations: { // = state changes
    editorProjectClear(state) {
      state.project = null
      state.editor.selectedPanelId=null
      state.editor.selectedElements = []
    },
    editorProjectNew(state, payload) {
      state.project = payload.project
    },
    editorProjectPanelNew(state, payload)
    {
      state.project.panels.push(payload.panel)
    },
    editorProjectSetPanelSelected(state, payload)
    {
      state.editor.selectedPanelId = payload.panelId
    },
    editorProjectPanelAddElement(state, payload)
    {
      let panel = state.project.panels.filter((oPanel) => { return oPanel.standard.id===payload.panelId }).shift()
      if(panel)
          panel.elements.push(payload.element)
    },
    editorProjectPanelReplaceElement(state, payload)
    {
      let panel = state.project.panels.filter((oPanel) => { return oPanel.standard.id===payload.panelId }).shift()
      if(panel)
      {
        for(let i=0;i<panel.elements.length;i++)
        {
          if(panel.elements[i].standard.id === payload.element.standard.id)
          {
            panel.elements.splice(i,1)
            break
          }
        }
        panel.elements.push(payload.element)
      }
    },
    editorProjectPanelResizeElement(state, payload)
    {
      let panel = state.project.panels.filter((oPanel) => { return oPanel.standard.id===payload.panelId }).shift()
      if(panel)
      {
        let element = panel.elements.filter((oElement) => {
          return oElement.standard.id===payload.elementId
        }).shift()
        element.standard.position.absolute.width = payload.width
        element.standard.position.absolute.height = payload.height
      }
    },
    editorProjectPanelClearElementSelected(state,payload) {
      let o = state.editor.selectedElements
      if(o)
      {
        for(let i=0;i<o.length;i++)
        {
          if(o[i].panelId===payload.panelId)
          {
            o.splice(i,1)
            break
          }
        }
      }
    },
    editorProjectPanelSetElementSelected(state,payload) {
      let o = state.editor.selectedElements
      if(o)
      {
        o = o.filter((l) => { return l.panelId===payload.panelId }).shift()
        if(o)
        {
          o.elements = [payload.elementId]
        }
        else
        {
          o = {
            panelId: payload.panelId,
            elements: [ payload.elementId ]
          }
          state.editor.selectedElements.push(o)
        }
      }
    }
  },
  actions: {
    editorProjectClear(context) {
      return new Promise((resolve, reject) => {
        context.commit('editorProjectClear')
        resolve(true)
      })
    },
    editorProjectNew(context, payload) {
      return new Promise((resolve, reject) => {

        let o = {
          standard: {
            saved: false
          },
          properties: {
            title: payload.title,
          },
          panels: [
          ]
        }

        context.commit('editorProjectNew', { project:o } )
        resolve(true)
      })
    },
    editorProjectPanelNew(context, payload)
    {
      return new Promise((resolve, reject) => {
        let id = utils.uniqid()
        let o = {
          standard: {
            id: id, /* unique id, identify the element exact at runtime like html attribute id */
            css: "",
            javascript: "",
            php: ""
          },
          editor: {
            width: '2000px',
            height: '2000px'
          },
          properties: {
            title: payload.title
          },
          elements: []
        }
        context.commit('editorProjectPanelNew', { panel:o } )
        resolve(id)
      })
    },
    editorProjectSetPanelSelected(context, payload)
    {
      return new Promise((resolve, reject) => {
        context.commit('editorProjectSetPanelSelected', { panelId: payload.panelId } )
        resolve(true)
      })
    },
    editorProjectPanelAddElement(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit('editorProjectPanelAddElement', { element: payload.element, panelId: payload.panelId } )
        resolve(true)
      })
    },
    editorProjectPanelReplaceElement(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit('editorProjectPanelReplaceElement', { element: payload.element, panelId: payload.panelId } )
        resolve(true)
      })
    },
    editorProjectPanelResizeElement(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit('editorProjectPanelResizeElement', payload )
        resolve(true)
      })
    },
    editorProjectPanelClearElementSelected(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit('editorProjectPanelClearElementSelected', payload )
        resolve(true)
      })
    },
    editorProjectPanelSetElementSelected(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit('editorProjectPanelSetElementSelected', payload )
        resolve(true)
      })
    }
  },
  modules: {},
  getters: { // = computed properties
    editorSideBarGroups: (state) => {
      let aElements = state.editor.elements
      const aGroups = []
      aElements.forEach((oElement) => {
        let sGroup = oElement.editor.sideBar.group
        if(aGroups.indexOf(sGroup) === -1)
          aGroups.push(sGroup)
      })
      return aGroups
    },
    editorSideBarElementsFromGroup: (state) => {
      return (sGroupName, sSearch) => {
        return state.editor.elements.filter((oElement) => {
          if(oElement.editor.sideBar.group === sGroupName)
          {
            if(sSearch!=="")
            {
              if(oElement.editor.sideBar.title.toLowerCase().search(sSearch.toLowerCase())===-1)
                return false
            }
            return true
          }
        })
      }
    },
    editorSideBarGetElement(state) {
      return (elementId) => {
        return state.editor.elements.filter((oElement) => {
          return oElement.standard.elementId === elementId
        }).shift()
      }
    },
    editorProjectPresent: (state) => {
      return state.project !==null
    },
    editorProjectSaved: (state, getters) => {
      if(getters.editorProjectPresent)
      {
        if(state.project.saved)
          return true
      }
      return false
    },
    editorProjectGetPanelSelectedId: (state, getters) => {
      return state.editor.selectedPanelId
    },
    editorProjectGetPanels: (state, getters) => {
      let aList = []
      if(getters.editorProjectPresent)
      {
        aList = state.project.panels
      }
      return aList
    },
    editorProjectGetPanelSelected: (state, getters) => {
      let panelId = getters.editorProjectGetPanelSelectedId
      return getters.editorProjectGetPanel(panelId)
    },
    editorProjectGetPanel(state, getters) {
      return function(panelId) {
        if(getters.editorProjectPresent) {
          if (panelId !== null)
            return state.project.panels.filter((oPanel) => {
              return oPanel.standard.id === panelId

            }).shift()
        }
        return null
      }
    },
    editorProjectPanelGetElement: (state, getters) => {
      return function(panelId, id) {
        let oPanel = getters.editorProjectGetPanel(panelId)
        if(oPanel) {
          return oPanel.elements.filter((oElement) => {
            return oElement.standard.id===id
          }).shift()
        }
        return null
      }
    },
    editorProjectPanelGetElementsAssignedPanel: (state, getters) => {
      return function(panelId) {
        let oPanel = getters.editorProjectGetPanel(panelId)
        if(oPanel) {
          return oPanel.elements.filter((oElement) => {
            return oElement.standard.parentId===panelId
          })
        }
        return null
      }
    },
    editorProjectPanelGetElementsAssignedElement: (state, getters) => {
      return function(panelId, parentId) {
        let oPanel = getters.editorProjectGetPanel(panelId)
        if(oPanel) {
          return oPanel.elements.filter((oElement) => {
            return oElement.standard.parentId===parentId
          })
        }
        return null
      }
    },
    editorProjectPanelIsElementSelected: (state,) => {
      return function(panelId, elementId) {
        let o = state.editor.selectedElements
        if(o)
        {
          o = o.filter((o) => { return o.panelId===panelId }).shift()
          if(o)
          {
            return o.elements.indexOf(elementId) !== -1
          }
        }
        return false
      }
    }


    /*
    elementList: (state) => {
      return state.elementList
    },
    selectedForm: (state) => {
      return null
    },
    getForm: function (state) {
      return (id) => {
        return state.form.list.filter(function (form) {
          return form.id === id
        }).shift()
      }
    },
    getElement: function (state, getter) {
      return (idForm, idElement) => {
        let form = getter.getForm(idForm)
        return form.elements.filter(function (element) {
          return element.id === idElement
        }).shift()
      }
    }
     */

  }
})


export default store
