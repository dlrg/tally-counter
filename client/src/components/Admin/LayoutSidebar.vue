<template>
  <v-navigation-drawer
    v-model="drawer"
    clipped
    fixed
    app
  >
    <v-list dense>
      <v-list-tile
        @click="$router.push({name: 'Dashboard'})"
      >
        <v-list-tile-action>
          <v-icon>fa-home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        @click="$router.push({name: 'EventList'})"
      >
        <v-list-tile-action>
          <v-icon>fa-calendar</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Events</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        @click="$router.push({name: 'Counter'})"
      >
        <v-list-tile-action>
          <v-icon>fa-external-link-alt</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Counter</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    drawer: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
