<template>
<v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" fixed app>
      <v-list dense>
        <v-layout row align-center>
          <v-subheader>
            Admin Stuff
          </v-subheader>
        </v-layout>

        <v-list-tile @click="$router.push({ name: 'counter' })">
          <v-list-tile-action>
            <v-icon>fa-bolt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Tally Counter
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon>fa-exclamation</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              some curios content - not working
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon>fa-bell</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              uff - not working
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  props: [ 'drawer' ]
}
</script>
