<template>
  <div>
    <v-toolbar
      flat
    >
      <v-toolbar-title>Events</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      />
      <v-spacer />
      <v-btn
        dark
        :to="{name: 'EventCreate'}"
      >
        New
      </v-btn>
    </v-toolbar>
    <v-data-table
      :pagination.sync="pagination"
      :headers="headers"
      :loading="loading"
      :items="event.data"
      item-key="_id"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr
          @click="$router.push({name: 'EventEdit', params: {eventId: props.item._id}})"
        >
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.in }}</td>
          <td>{{ props.item.out }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'EventList',
  data: () => ({
    event: {},
    loading: false,
    headers: [
      {
        text: 'Name',
        value: 'name'
      },
      {
        text: 'Eingang',
        value: 'in',
        allign: 'right'
      },
      {
        text: 'Ausgang',
        value: 'out',
        allign: 'right'
      }
    ]
  }),
  computed: {
    pagination: {
      get () {
        return {
          page: this.page,
          rowsPerPage: this.limit,
          totalItems: this.event.total
        }
      },
      set (pagination) {
        this.page = pagination.page
        this.limit = pagination.limit
      }
    },
    page: {
      get () {
        return Number.parseInt(this.$route.query.page) || 1
      },
      set (page) {
        this.$router.push({ query: { ...this.$route.query, page, limit: this.event.limit } })
      }
    },
    limit: {
      get () {
        return Number.parseInt(this.$route.query.limit) || 1
      },
      set (limit) {
        this.$router.push({ query: { ...this.$route.query, limit } })
      }
    },
    sortBy: {
      get () {
        return this.$route.query.sortBy
      },
      set (sortBy) {
        this.$router.replace({ query: { ...this.$route.query, sortBy, limit: this.event.limit } })
      }
    },
    sortDesc: {
      get () {
        return this.$route.query.sortDesc === 'true' || this.$route.query.sortDesc === true
      },
      set (sortDesc) {
        this.$router.replace({ query: { ...this.$route.query, sortDesc, limit: this.event.limit } })
      }
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

        let query = {
          $skip: (this.page - 1) * this.limit,
          $sort: { createdAt: -1 },
          $limit: this.limit
        }
        if (this.sortBy) {
          query.$sort = { [this.sortBy]: this.sortDesc ? -1 : 1 }
        }
        this.event = await this.$store.dispatch('event/find', { query })
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
