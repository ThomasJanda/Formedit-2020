import utils from './utils'
const global = utils.global()

const project = {
  async clear () {

    var bClear = true
    if(global.App.$store.getters.editorProjectPresent && !global.App.$store.getters.editorProjectSaved)
    {
      bClear = false
      await global.App.$confirm("Do you really like to clear the project").then(() => {
        bClear = true
      }, () => {
        bClear = false
      })

      if(bClear)
        global.App.$store.dispatch('editorProjectClear')
    }

    return bClear

  },
  async new() {

    let bClear = await this.clear()
    if(bClear)
    {
      global.App.$prompt('Title of the project').then( (title) => {
        global.App.$store.dispatch('editorProjectNew', {
          title: title
        })
      })
    }
  },
  test() {
    alert(global.App.$store.state.test)
  }
}

export default project
