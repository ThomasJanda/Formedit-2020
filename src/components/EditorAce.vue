<template>
  <pre :data-mode="mode" ref="pre"><slot></slot></pre>
</template>

<script>
  import ace from 'ace-builds/src-noconflict/ace'
  import 'ace-builds/src-noconflict/theme-twilight'
  import 'ace-builds/src-noconflict/mode-css'
  import 'ace-builds/src-noconflict/mode-javascript'
  import 'ace-builds/src-noconflict/mode-php'

  export default {
    name: "EditorAce",
    props: {
      mode: {
        type: String,
        required: true
      }
    },
    methods: {
      createEditor() {
        let vm = this
        let el = this.$refs.pre
        let sMode = el.getAttribute('data-mode')
        let e = ace.edit(el)
        e.setTheme("ace/theme/twilight")
        e.session.setMode({path:"ace/mode/" + sMode, inline: true})

        e.on("blur", function(event) {
          let value = e.getValue()
          /* save data */
          vm.$emit('save', value)
        })
      }
    },
    mounted () {
      this.createEditor()
    }

  }
</script>

<style scoped lang="scss">
  pre
  {
    height:100%;
  }
</style>
