<template>
  <div
    id="app"
    class="app"
  >
    <Home />
  </div>
</template>

<script>
  import Home from 'Pages/Home.vue';

  export default {
    name: 'App',
    components: {
      Home,
    },
  };
</script>

<style lang="scss">
@import './assets/scss/style.scss';
</style>
