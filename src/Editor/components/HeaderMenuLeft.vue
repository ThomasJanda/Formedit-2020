<template>
  <div id="menuLeft">
    <ul>
      <li>
        <span>Project</span>
        <ul>
          <li><a @click.stop="projectNew">New</a></li>
          <li><a @click.stop="projectLoad">Load...</a></li>
          <li><a @click.stop="projectSave">Save</a></li>
          <li><a @click.stop="projectSaveAs">Save as...</a></li>
          <li><a>Properties</a></li>
        </ul>
      </li>
      <li>
        <span>Formular</span>
        <ul>
          <li><a>New</a></li>
          <li><a>Properties</a></li>
          <li><a>Delete</a></li>
        </ul>
      </li>
      <li>
        <span>Element</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'MenuHeaderLeft',
    methods: {
      projectNew: function () {
        alert('New')
      },
      projectLoad: function () {
        alert('Load')
      },
      projectSave: function () {
        alert('Save')
      },
      projectSaveAs: function () {
        alert('Save as')
      }
    }
  }
</script>

<style scoped lang="scss">
  div#menuLeft {
    float: left;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      background-color: gray;
      &:hover {
        background-color: lightblue;
      }
    }

    a {
      padding: 0px 5px;
      cursor: pointer;
      display: block;
      line-height: 25px;
      height: 25px;
      white-space: nowrap;
    }

    span {
      padding: 0px 5px;
      display: block;
      line-height: 25px;
      height: 25px;
      white-space: nowrap;
    }

    > ul {
      > li {
        position: relative;
        float: left;
        > ul {
          position: absolute;
          left: 0;
          top: 100%;
          display: none;
        }
        &:hover {
          > ul {
            display: block;
          }
        }
      }
    }
  }
</style>
