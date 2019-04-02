<template>
  <select :value="value" @change="$emit('input', $event.target.value)">
    <option :value="undefined" hidden disabled>Keine Position ausgewählt</option>
    <option v-for="position of positions" :key="position._id" :value="position._id">{{ position.name }}</option>
  </select>
</template>

<script>
export default {
  name: 'PositionSelect',
  props: ['value'],
  computed: {
    positions () {
      return this.$store.getters['position/list']
    }
  },
  created () {
    this.$store.dispatch('position/find')
  }
}
</script>

<style lang="scss" scoped>
  select {
    padding: 1.5em;
    width: 100%;
    background-color: #fff;
  }
</style>
