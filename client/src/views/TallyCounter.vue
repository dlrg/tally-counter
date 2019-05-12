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
      <main
        v-if="counter"
        @click="count"
      >
        <counter
          :value="counter.data.diff"
          name="Besucher aktuell"
        />
        <counter
          :value="ownCount"
          name="Selber gezählte Besucher"
        />
      </main>
      <main v-else>
        <div class="no-event-msg">
          <h1 class="no-event-msg__value">
            Kein Event ausgewählt
          </h1>
        </div>
      </main>
      <eventSelect
        v-model="eventId"
        class="eventSelect"
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
import EventSelect from '../components/TallyCounter/EventSelect'
import DirectionSelect from '../components/TallyCounter/DirectionSelect'
import Error from '../components/Error'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Counter,
    EventSelect,
    DirectionSelect,
    Error
  },
  data () {
    return {
      ownCount: 0,
      blink: false,
      eventId: null,
      direction: null,
      adminPrep: false,
      adminInterval: null,
      clientId: null
    }
  },
  computed: {
    ...mapState({ connection: 'connection' }),
    counter () {
      console.log(this.eventId)
      console.log(this.$store.getters['counter/get'](this.eventId))
      return this.$store.getters['counter/get'](this.eventId)
    }
  },
  watch: {
    eventId: function (newVal, oldVal) {
      this.$store.dispatch('channel-subscription/remove', oldVal)
      this.$store.dispatch('channel-subscription/create', { eventId: newVal })
      this.$store.dispatch('counter/get', newVal)
      this.ownCount = 0
    },
    direction: function () {
      this.ownCount = 0
    }
  },
  async created () {
    this.$store.dispatch('counter/get', this.eventId)
    let clientId = localStorage.getItem('clientId')
    if (!clientId) {
      const client = await this.$store.dispatch('client/create', {})
      localStorage.setItem('clientId', client._id)
      clientId = client._id
    }
    this.clientId = clientId
  },
  methods: {
    swipe (swipe) {
      if (this.adminPrep && swipe === 'left') {
        clearTimeout(this.adminInterval)
        this.adminPrep = false
        if (this.eventId) {
          this.$router.push({ name: 'EventDetail', params: { eventId: this.eventId } })
        } else {
          this.$router.push({ name: 'Dashboard' })
        }
      } else if (swipe === 'down') {
        this.adminPrep = true
        this.adminInterval = setTimeout(() => { this.adminPrep = false }, 1000)
      }
    },
    ...mapActions('counter', {
      enter: 'create'
    }),
    count () {
      const { eventId, direction, clientId } = this
      if (eventId && direction) {
        navigator.vibrate(100)
        this.blink = true
        this.ownCount++
        this.enter({ eventId, direction, clientId })
      }
    }
  }
}
</script>

<style scoped lang="scss">
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

  .eventSelect {
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
  .no-event-msg {
    padding: 3em 0;
    text-align: center;
    color: #fff;

    .no-event-msg__value {
      margin: 0;
      font-size: 3em;
    }
  }
</style>
