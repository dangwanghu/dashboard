<template>
  <div class="page page-current">
      <router-view ></router-view>
  </div>
</template>

<script>

export default {
  ready () {
  }
}
</script>

<style>
@import './assets/css/sm.css';
[v-cloak] {
  display: none;
}
.fade-transition {
  transition: opacity .1s ease;
}
.fade-enter, .fade-leave {
  opacity: 0;
}

</style>
