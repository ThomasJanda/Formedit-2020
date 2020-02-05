<template>
  <div id="menuRight">
    <ul>
      <li>
        <span>Status: {{status}}</span>
        <ul>
          <li><span>Path: {{path}}</span></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HeaderMenuRight',
    data: function () {
      return {
        path: '',
        status: 'unsaved'
      }
    }
  }
</script>

<style scoped lang="scss">
  div#menuRight
  {
    float:right;

    ul
    {
      list-style:none;
      padding:0;
      margin:0;
    }
    li
    {
      background-color:gray;
      &:hover
      {
        background-color:lightblue;
      }
    }
    a
    {
      padding:0px 5px;
      cursor:pointer;
      display:block;
      line-height:25px;
      height:25px;
      white-space: nowrap;
    }
    span
    {
      padding:0px 5px;
      display:block;
      line-height:25px;
      height:25px;
      white-space: nowrap;

    }


    > ul
    {
      > li
      {
        position:relative;
        float:left;
        > ul
        {
          position: absolute;
          right: 0;
          left: auto;
          top: 100%;
          display: none;
        }
        &:hover
        {
          > ul
          {
            display:block;
          }
        }
      }
    }
  }
</style>
