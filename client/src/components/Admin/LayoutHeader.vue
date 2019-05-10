<template>
  <v-toolbar
    app
    fixed
    clipped-left
  >
    <v-toolbar-side-icon @click.stop="$emit('toggleDrawer')" />
    <v-toolbar-title>Tally Counter</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'LayoutHeader',
  props: {
    extendDrawer: {
      type: Boolean,
      default: false
    }
  }
}
</script>
