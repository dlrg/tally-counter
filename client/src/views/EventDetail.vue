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
        Status: {{ event.status | formatEventStatus }}
        <p v-if="counter">
          Aktuelle Besucher: {{ counter.data.diff }}<br>
          Eingang: {{ counter.data.in }}<br>
          Ausgang: {{ counter.data.out }}
        </p>
        
        <v-layout>
          <v-flex xs6 sm3 pa-1>
            <v-card :color="event.status === 'OPEN' ? 'green' : 'red'" dark max-width="200">
              <v-card-title>
                <v-icon large left>
                  fa-info-circle
                </v-icon>
                <span class="title font-weight-light">Status</span>
              </v-card-title>

              <v-card-text class="headline font-weight-bold">
                {{ event.status === 'OPEN' ? 'Offen' : 'Rot' }}
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6 sm3 pa-1 v-if="counter">
            <v-card color="info" dark max-width="200">
              <v-card-title>
                <v-icon large left>
                  fa-info-circle
                </v-icon>
                <span class="title font-weight-light">Gesamt</span>
              </v-card-title>

              <v-card-text class="headline font-weight-bold">
                {{ counter.data.diff }}
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6 sm3 pa-1 v-if="counter">
            <v-card color="info" dark max-width="200">
              <v-card-title>
                <v-icon large left>
                  fa-info-circle
                </v-icon>
                <span class="title font-weight-light">Rein</span>
              </v-card-title>

              <v-card-text class="headline font-weight-bold">
                {{ counter.data.in }}
              </v-card-text>
            </v-card>
          </v-flex>  
          <v-flex xs6 sm3 pa-1 v-if="counter">
            <v-card color="info" dark max-width="200">
              <v-card-title>
                <v-icon large left>
                  fa-info-circle
                </v-icon>
                <span class="title font-weight-light">Raus</span>
              </v-card-title>

              <v-card-text class="headline font-weight-bold">
                {{ counter.data.out }}
              </v-card-text>
            </v-card>
          </v-flex> 
        </v-layout>
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
import formatEventStatus from '../filters/formatEventStatus'
export default {
  name: 'EventDetail',
  filters: {
    formatEventStatus
  },
  data: () => ({
    loading: true,
    event: null,
    statsLoading: false,
    statsLoadInterval: null,
    statsLoadIntervalTime: 5000,
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
  mounted () {
    console.log(this.$vuetify.breakpoint)
  },
  watch: {
    '$route': {
      immediate: true,
      handler: 'fetchData'
    }
  },
  created () {
    this.loadStats()
    this.statsLoadInterval = setInterval(() => this.loadStats(), this.statsLoadIntervalTime)
  },
  destroyed () {
    clearInterval(this.statsLoadInterval)
  },
  methods: {
    async fetchData () {
      try {
        this.loading = true
        if (this.event) {
          this.$store.dispatch('channel-subscription/remove', this.event._id)
        }

        this.event = await this.$store.dispatch('event/get', this.$route.params.eventId)
        this.loadStats()
        await this.$store.dispatch('channel-subscription/create', { eventId: this.event._id })
        await this.$store.dispatch('counter/get', this.event._id)
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async loadStats () {
      if (this.statsLoading || !this.event) return
      try {
        this.statsLoading = true
        this.eventStats = await feathers.service('event-stats').get(this.event._id)
      } catch (error) {
        console.error(error)
      } finally {
        this.statsLoading = false
      }
    }
  }
}
</script>
