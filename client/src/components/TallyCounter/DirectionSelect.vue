<template>
  <select
    :value="value"
    @change="$emit('input', $event.target.value)"
  >
    <option
      :value="undefined"
      hidden
      disabled
    >
      Keine Richtung ausgewählt
    </option>
    <option value="up">
      Eingang
    </option>
    <option value="down">
      Ausgang
    </option>
  </select>
</template>

<script>
export default {
  name: 'DirectionSelect',
  props: {
    value: {
      type: String,
      default: 'up'
    }
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
