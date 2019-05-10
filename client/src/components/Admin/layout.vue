<template>
  <v-app id="inspire">
    <layout-sidebar :drawer="drawer" />
    <layout-header :drawer="drawer" />
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <slot />
      </v-container>
    </v-content>
    <v-btn
      color="red"
      dark
      fab
      fixed
      bottom
      right
      @click="drawer = !drawer"
    >
      <v-icon>fa-bolt</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import LayoutHeader from './layout-header'
import LayoutSidebar from './layout-sidebar'

export default {
  components: {
    LayoutHeader,
    LayoutSidebar
  },
  data () {
    return {
      drawer: false
    }
  }
}
</script>
