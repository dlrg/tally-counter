<template>
  <p>{{ message }}</p>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  p {
    font-family: Arial, Helvetica, sans-serif;
    background-color: red;
    padding: 2em;
    margin: 0;
    color: #fff;
    text-align: center;
  }
</style>
