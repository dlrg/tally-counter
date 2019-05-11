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
  mounted () {
    console.log(this.$vuetify.breakpoint)
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
