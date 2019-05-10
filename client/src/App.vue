<template>
  <component
    :is="layout"
    class="section-app"
  >
    <router-view />
  </component>
</template>

<script>
import Admin from './components/Admin/Layout'
export default {
  name: 'App',
  computed: {
    layout () {
      switch (this.$route.meta.layout) {
      case 'Admin': return Admin
      default: return 'div'
      }
    }
  }
}
</script>

<style lang="scss">

  html, body, .section-app {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  * {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }
</style>
