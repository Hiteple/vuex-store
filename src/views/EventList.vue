<template>
  <div>
    <h1>Events for {{ userModule.user.name }}</h1>
    <EventCard v-for="event in eventsModule.events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link :to="{name: 'event-list', query: {page: page - 1}}" rel="prev">Previous page</router-link>
    </template> |
    <template v-if="page * 3 < eventsModule.totalPages">
      <router-link :to="{name: 'event-list', query: {page: page + 1}}" rel="prev">Next page</router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex';

export default {
  components: {
    EventCard
  },
  created() {
     this.$store.dispatch('fetchEvents', {perPage: 3, page: this.page});
  },
  computed: {
     page() {
      return parseInt(this.$route.query.page) || 1;
     },
     ...mapState(['eventsModule', 'userModule'])
  }
}
</script>
