<template>
  <div class="ace">
    <div class="toolbar">
      <div class="left">
        <button type="button" @click="undo" ref="undo" title="undo">&#10226;</button>
        <button type="button" @click="redo" ref="redo" title="redo">&#10227;</button>
      </div>
      <div class="right">
        <div class="status" ref="status"></div>
      </div>
    </div>
    <div class="editor">
      <pre ref="pre"><slot></slot></pre>
    </div>

  </div>

</template>

<script>
  import ace from 'ace-builds/src-noconflict/ace'
  import 'ace-builds/webpack-resolver'

  export default {
    name: "EditorAce",
    props: {
      type: {
        type: String,
        required: true
      },
      theme: {
        type: String,
        default: 'merbivore'
      },
      panelId: {
        type: String,
        required: true
      }
    },
    data: () => {
      return {
        editor: Object
      }
    },
    methods: {
      undo() {
        this.editor.undo()
        this.updateToolbar()
      },
      redo() {
        this.editor.redo()
        this.updateToolbar()
      },
      updateToolbar()
      {
        this.$refs.undo.disabled = !this.editor.session.getUndoManager().hasUndo()
        this.$refs.redo.disabled = !this.editor.session.getUndoManager().hasRedo()
      },
      createEditor() {
        require('ace-builds/src-noconflict/mode-' + this.type)
        require('ace-builds/src-noconflict/theme-' + this.theme)
        require('ace-builds/src-noconflict/ext-language_tools')
        require('ace-builds/src-noconflict/ext-statusbar')
        //require('ace-builds/src-noconflict/ext-error_marker')

        var vm = this
        let el = this.$refs.pre
        this.editor = ace.edit(el)
        let StatusBar = ace.require("ace/ext/statusbar").StatusBar
        new StatusBar(this.editor, this.$refs.status)
        this.editor.setTheme("ace/theme/" + this.theme)
        this.editor.setOptions({
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true,
          showInvisibles:true,
          mergeUndoDeltas:false,
          highlightActiveLine:true,
          displayIndentGuides:true
        })
        this.editor.session.setMode({path:"ace/mode/" + this.type, inline: true})

        this.editor.on("blur", function(event) {
          let value = vm.editor.getValue()
          /* save data */
          vm.save(value)
        })
        this.editor.on("input", function() { vm.updateToolbar() })
        this.updateToolbar()
      },
      save(source)
      {
        this.$store.dispatch('editorProjectPanelSetSource', {panelId: this.panelId, type: this.type, source:source})
      },
      load()
      {
        let source = this.$store.getters.editorProjectPanelGetSource(this.panelId, this.type)
        this.editor.setValue(source)
      }
    },
    mounted () {
      this.createEditor()
      this.load()
    },
    watch: {
      panelId() {
        this.load()
      }
    }

  }
</script>

<style scoped lang="scss">
  div.ace
  {
    height:100%;

    div.toolbar
    {
      height:25px;

      div.left
      {
        float:left;

        button
        {
          padding:0px 5px;
          height:25px;
          &:disabled
          {
            cursor:not-allowed;
          }
        }
      }
      div.right
      {
        float:right;
      }

    }
    div.editor
    {
      height:calc(100% - 40px);
      position:relative;
      pre
      {
        margin:0;
        height:100%;
      }
    }
  }
</style>
