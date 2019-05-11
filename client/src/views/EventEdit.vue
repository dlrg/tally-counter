<template>
  <div>
    <template v-if="loading">
      Lädt...
    </template>
    <template v-else>
      <v-form
        ref="form"
        v-model="valid"
        class="p-4"
        lazy-validation
      >
        <v-toolbar
          flat
        >
          <v-toolbar-title>
            Event
            <span v-if="isCreate">
              Erstellen
            </span>
            <span v-else>
              Bearbeiten
            </span>
          </v-toolbar-title>
          <v-divider
            class="mx-2"
            inset
            vertical
          />
          <v-spacer />
          <v-btn
            v-if="!isCreate"
            :disabled="removePending"
            color="danger"
            @click="remove"
          >
            Löschen
          </v-btn>
          <v-btn
            :disabled="!valid || savePending"
            color="success"
            @click="save"
          >
            <span v-if="isCreate">
              Erstellen
            </span>
            <span v-else>
              Speichern
            </span>
          </v-btn>
        </v-toolbar>
        <v-sheet
          elevation="4"
          class="pa-4"
        >
          <v-text-field
            v-model="event.name"
            label="Name"
            required
          />
          <v-select
            v-model="event.status"
            :items="[
              {text: 'Offen', value: 'OPEN'},
              {text: 'Geschlossen', value: 'CLOSED'}
            ]"
            label="Status"
            required
          />
        </v-sheet>
      </v-form>
    </template>
  </div>
</template>

<script>
export default {
  name: 'EventEdit',
  data: () => ({
    loading: true,
    valid: false,
    savePending: false,
    removePending: false,
    event: null
  }),
  computed: {
    isCreate () {
      return this.$route.meta.isCreate
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
        if (this.isCreate) {
          this.event = new this.$FeathersVuex.Event()
        } else {
          this.event = await this.$store.dispatch('event/get', this.$route.params.eventId)
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async save () {
      try {
        this.savePending = true
        await this.event.save()
        await this.$router.push({ name: 'EventList' })
      } catch (error) {
        console.error(error)
      } finally {
        this.savePending = false
      }
    },
    async remove () {
      try {
        this.removePending = true
        await this.event.remove()
        await this.$router.push({ name: 'EventList' })
      } catch (error) {
        console.error(error)
      } finally {
        this.removePending = false
      }
    }
  }
}
</script>
