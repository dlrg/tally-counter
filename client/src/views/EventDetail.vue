<template>
  <div>
    <template v-if="loading">
      Lädt...
    </template>
    <template v-else>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{ event.name }}</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        />
        <v-spacer />
        <v-btn
          color="success"
          :to="{name: 'EventEdit', params: {eventId: event._id}}"
        >
          Bearbeiten
        </v-btn>
      </v-toolbar>
      <v-sheet class="pa-4">
        Status: {{ event.status }}
        <p v-if="counter">
          Count: {{ counter.data.diff }}<br>
          In: {{ counter.data.in }}<br>
          Out: {{ counter.data.out }}
        </p>
        <line-chart
          :data="eventStats"
          :download="true"
        />
      </v-sheet>
    </template>
  </div>
</template>

<script>
import feathers from '../api'
export default {
  name: 'EventDetail',
  data: () => ({
    loading: true,
    event: null,
    eventStats: null
  }),
  computed: {
    entries () {
      if (!this.event) {
        return []
      }
      return this.$store.getters['entry/list'].filter(entry => entry.eventId === this.event._id)
    },
    counter () {
      return this.$store.getters['counter/get'](this.event._id)
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler: 'fetchData'
    }
  },
  methods: {
    async fetchData () {
      try {
        this.loading = true
        if (this.event) {
          this.$store.dispatch('channel-subscription/remove', this.event._id)
        }

        this.event = await this.$store.dispatch('event/get', this.$route.params.eventId)
        this.eventStats = await feathers.service('event-stats').get(this.event._id)
        await this.$store.dispatch('channel-subscription/create', { eventId: this.event._id })
        await this.$store.dispatch('counter/get', this.event._id)
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
