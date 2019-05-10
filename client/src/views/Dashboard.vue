<template>
  <layout>
    Hey {{ test }}
    <line-chart
      :data="bla"
      :download="true"
    />
  </layout>
</template>

<script>
import Layout from '../components/Admin/layout'

export default {
  components: {
    Layout
  },
  data () {
    return {
      test: 'bla',
      bla: {
        '2017-05-14 23:00': 2,
        '2017-05-15 00:15': 5,
        '2017-05-15 15:30': 5,
        '2017-05-15 15:45': 5
      }
    }
  },
  computed: {

  }
}
</script>

<style scoped>
</style>
