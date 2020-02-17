<template>
  <div class="list">
    <div class="item" v-for="(value, name) in object" :key="name" :class="{ object: typeof value==='object', property: typeof value!=='object' }">
      <span
        v-if="typeof value==='object'"
        @click="toggleProperties(pathId + '.' + name)"
        :class="{hide: hideProperties((pathId + '.' + name))}"
      >
        {{ name }}
      </span>
      <div
        v-if="typeof value==='object'"
        :class="{hide: hideProperties((pathId + '.' + name))}"
      >
        <side-bar-property-list
          :object="value"
          :panel-id="panelId"
          :element-id="elementId"
          :path-id="pathId + '.' + name" />
      </div>

      <span
        v-if="typeof value!=='object'"
      >
        {{ name }}
      </span>
      <div
        v-if="typeof value!=='object'">
        <input
          type="text"
          v-if="typeof value==='string'"
          :name="name"
          :value="value"
        >
        <input
          type="number"
          v-else-if="typeof value==='number'"
          :name="name"
          :value="value"
        >
        <input
          type="checkbox"
          v-else-if="typeof value==='boolean'"
          :name="name"
          :value="1"
          :checked="value===true ? 'checked' : ''"
        >
        <span
          v-else
        >{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SideBarPropertyList',
    props: {
      object: {
        type: Object,
        required: true
      },
      panelId: {
        type: String,
        required: true
      },
      elementId: {
        type: String,
        required: true
      },
      pathId: {
        type: String,
        default: 'root'
      }
    },
    methods: {
      toggleProperties(sFullPathProperties)
      {
        this.$store.dispatch('editorProjectPanelElementPropertiesToggle', { fullPropertyPath: sFullPathProperties })
      },
      hideProperties(sFullPathProperties)
      {
        return this.$store.getters.editorProjectPanelElementPropertiesIsHide(sFullPathProperties)
      }
    }
  }
</script>

<style scoped lang="scss">
  div.list
  {
    list-style: none;
    padding:0;
    margin:0;
    background-color:gray;

    > div.item
    {
      overflow:hidden;

      &.property
      {
        > span
        {
          display:block;
          float:left;
          width:150px;
          height:25px;
          line-height:25px;
          padding:0 5px;
          box-sizing: border-box;
          vertical-align:middle;
          text-align:left;
          background-color:gray;
        }
        > div
        {
          float:left;
          width: calc(100% - 150px);
          height:25px;
          line-height:25px;
          box-sizing: border-box;
          vertical-align:middle;
          text-align:left;
          background-color:lightgray;

          input[type='text'], input[type='number'] {
            width:100%;
          }
        }
      }

      &.object
      {
        > span
        {
          display:block;
          width:100%;
          height:25px;
          line-height:25px;
          padding:0 5px;
          box-sizing: border-box;
          vertical-align:middle;
          text-align:left;
          background-color:gray;
          border-top:1px solid black;
          cursor:pointer;

          &::before
          {
            content: "- ";
          }

          &.hide
          {
            &::before
            {
              content: "+ ";
            }
          }
        }
        > div
        {
          padding-left:5px;

          &.hide
          {
            display:none;
          }

        }
      }
    }
  }
</style>
