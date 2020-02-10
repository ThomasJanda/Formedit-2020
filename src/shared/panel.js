import utils from './utils'
const global = utils.global()

const panel = {
  new() {
    if(global.App.$store.getters.editorProjectPresent)
    {
      global.App.$prompt('Title of the panel').then( (title) => {
        global.App.$store.dispatch('editorProjectPanelNew', {
          title: title
        }).then((id) => {
          global.App.$store.dispatch('editorProjectSetPanelSelected', { panelId: id })
        })
      })
    }
    else
      global.App.$alert('Create a project first')
  }
}

export default panel
