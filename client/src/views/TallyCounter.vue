<template>
  <section
    v-touch="{
      left: () => swipe('left'),
      right: () => swipe('right'),
      up: () => swipe('up'),
      down: () => swipe('down')
    }"
  >
    <section
      v-if="connection"
      :class="{blink}"
      @transitionend="blink = false"
    >
      <main @click="count">
        <counter
          :value="currentVisitors"
          name="Besucher aktuell"
        />
        <counter
          :value="ownCount"
          name="Selber gezählte Besucher"
        />
      </main>
      <positionSelect
        v-model="positionId"
        class="positionSelect"
      />
      <directionSelect
        v-model="direction"
        class="directionSelect"
      />
    </section>
    <error
      v-if="!connection"
      message="Leider haben wir gerade keine Verbindung"
    />
  </section>
</template>

<script>
import Counter from '../components/TallyCounter/Counter'
import PositionSelect from '../components/TallyCounter/PositionSelect'
import DirectionSelect from '../components/TallyCounter/DirectionSelect'
import Error from '../components/Error'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Counter,
    PositionSelect,
    DirectionSelect,
    Error
  },
  data () {
    return {
      ownCount: 0,
      blink: false,
      positionId: null,
      direction: null,
      adminPrep: false,
      adminInterval: null
    }
  },
  computed: {
    ...mapState({ connection: 'connection' }),
    currentVisitors () {
      let currentVisitors = this.$store.getters['counter/get'](this.positionId)
      return currentVisitors ? currentVisitors.data : 0
    }
  },
  watch: {
    positionId: function (newVal, oldVal) {
      this.$store.dispatch('channel-subscription/remove', oldVal)
      this.$store.dispatch('channel-subscription/create', { positionId: newVal })
      this.$store.dispatch('counter/get', newVal)
      this.ownCount = 0
    },
    direction: function () {
      this.ownCount = 0
    }
  },
  created () {
    this.$store.dispatch('counter/get', this.positionId)
  },
  methods: {
    swipe (swipe) {
      if (this.adminPrep && swipe === 'left') {
        clearTimeout(this.adminInterval)
        this.adminPrep = false
        this.$router.push({ name: 'Dashboard' })
      } else if (swipe === 'down') {
        this.adminPrep = true
        this.adminInterval = setTimeout(() => { this.adminPrep = false }, 1000)
      }
    },
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
