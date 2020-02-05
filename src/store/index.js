import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  devtools:true,
  state: { // = data
    form: {
      selected: "2",
      list: [
        {
          id: "1",
          title: "test form",
          elements: [
            {
              id: "1",
              position: "absolute",
              positionAbsoluteLeft: 120,
              positionAbsoluteTop: 140,
              positionAbsoluteWidth: 200,
              positionAbsoluteHeight: 25
            }
          ]
        },
        {
          id: "2",
          title: "test form 2",
          elements: [
            {
              id: "1",
              position: "absolute",
              positionAbsoluteLeft: 110,
              positionAbsoluteTop: 150,
              positionAbsoluteWidth: 200,
              positionAbsoluteHeight: 25
            }
          ]
        }
      ],
    },


    elementList: [
      {
        id: "1",
        title: 'Element1'
      },
      {
        id: "2",
        title: 'Element2'
      },
      {
        id: "3",
        title: 'Element3'
      },
      {
        id: "4",
        title: 'Element4'
      },
      {
        id: "5",
        title: 'Element5'
      }
    ]
  },
  mutations: { // = state changes
    addFormElement(state, payLoad)
    {
      let form = state.form.list.filter(function(form) { return form.id===payLoad.idForm}).shift()
      form.elements.push(payLoad.element)
    },
    setFormSelected(state, payLoad)
    {
      state.form.selected = payLoad
    }
  },
  actions: {
  },
  modules: {
  },
  getters: { // = computed properties
    elementList: state => {
      return state.elementList
    },
    selectedForm: state => {
      return state.form.list.filter(function(form) { return form.id===state.form.selected}).shift()
    },
    getForm: function(state) {
      return (id) => {
        return state.form.list.filter(function(form) { return form.id===id}).shift()
      }
    },
    getElement: function(state, getter) {
      return (idForm, idElement) => {
        let form = getter.getForm(idForm)
        return form.elements.filter(function(element) {
          return element.id === idElement
        }).shift()
      }
    }

  }
})
