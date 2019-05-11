<template>
  <div>
    <select
      :value="value"
      @change="$emit('input', $event.target.value)"
    >
      <option
        :value="undefined"
        hidden
        disabled
      >
        Keine Event ausgewählt
      </option>
      <option
        v-for="event of openEvents"
        :key="event._id"
        :value="event._id"
      >
        {{ event.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'EventSelect',
  props: {
    value: {
      type: String,
      default: null
    }
  },
  computed: {
    events () {
      return this.$store.getters['event/list']
    },
    openEvents () {
      return this.events.filter(event => event.status === 'OPEN')
    }
  },
  created () {
    this.$store.dispatch('event/find')
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
