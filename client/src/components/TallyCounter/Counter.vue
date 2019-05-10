<template>
  <div class="counter">
    <h1 class="counter__value">
      {{ value }}
    </h1>
    <p class="counter__name">
      {{ name }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
  .counter {
    padding: 3em 0;
    text-align: center;
    color: #fff;
    .counter__value {
      margin: 0;
      font-size: 3em;
    }
    .counter__name {
      margin: 0;
      font-size: 1em;
    }
  }
</style>
