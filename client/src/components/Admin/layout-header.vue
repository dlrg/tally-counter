<template>
  <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <span class="hidden-sm-and-down">Tally Counter</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon large>
      <v-avatar size="32px" tile>
        <img
          src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
          alt="Vuetify"
        >
      </v-avatar>
    </v-btn>
  </v-toolbar>
</template>
