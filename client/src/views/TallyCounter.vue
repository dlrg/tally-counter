<template>
  <section :class="{blink}" @transitionend="blink = false">
    <main @click="count">
      <counter :value="currentVisitors" name="Besucher aktuell"/>
      <counter :value="ownCount" name="Selber gezählte Besucher"/>
    </main>
    <positionSelect v-model="positionId" class="positionSelect"/>
    <directionSelect v-model="direction" class="directionSelect"/>
  </section>
</template>

<script>
import Counter from '../components/Counter'
import PositionSelect from '../components/PositionSelect'
import DirectionSelect from '../components/DirectionSelect'
import { mapActions } from 'vuex'

export default {
  components: {
    Counter,
    PositionSelect,
    DirectionSelect
  },
  data () {
    return {
      ownCount: 0,
      blink: false,
      positionId: null,
      direction: null
    }
  },
  computed: {
    currentVisitors () {
      let currentVisitors = this.$store.getters['counter/get'](this.positionId)
      return currentVisitors ? currentVisitors.data : 0
    }
  },
  methods: {
    ...mapActions('counter', {
      enter: 'create'
    }),
    count () {
      const { positionId, direction } = this
      if (positionId && direction) {
        navigator.vibrate(100)
        this.blink = true
        this.ownCount++
        this.enter({ positionId, direction })
      }
    }
  },
  created () {
    this.$store.dispatch('counter/get', this.positionId)
  }
}
</script>

<style scoped>
  section {
    height: 100%;
    background-color: #2980b9;
    font-family: Arial, Helvetica, sans-serif;
    transition: 50ms background-color ease-in-out;
  }

  main {
    height: 100%;
  }

  * {
    touch-action: none;
  }

  .blink {
    background-color: #27ae60;
  }

  .positionSelect {
    position: absolute;
    width: 50%;
    bottom: 0;
    left:0;
  }

  .directionSelect {
    position: absolute;
    width: 50%;
    bottom: 0;
    right:0;
  }
</style>
