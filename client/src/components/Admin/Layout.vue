
<template>
  <v-app
    id="inspire"
    dark
  >
    <LayoutSidebar v-model="drawer" />
    <LayoutHeader @toggleDrawer="drawer = !drawer" />
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          justify-center
        >
          <v-flex>
            <slot>
              <router-view />
            </slot>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer
      app
      fixed
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import LayoutHeader from './LayoutHeader'
import LayoutSidebar from './LayoutSidebar'
export default {
  name: 'Layout',
  components: {
    LayoutHeader,
    LayoutSidebar
  },
  data: () => ({
    drawer: null
  })
}
</script>
