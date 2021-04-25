<template>
   <transition name="fade">
      <div class="notification-bar" :class="notificationTypeClass">
         <p>{{ notification.message }}</p>
      </div>
  </transition>
</template>

<script>
   import { mapActions } from 'vuex';

   export default {
      props: {
         notification: {
            type: Object,
            required: true
         }
      },
      data() {
         return {
            timeout: null
         }
      },
      mounted() {
         this.timeout = setTimeout(() => this.remove(this.notification), 5000);
      },
      beforeDestroy() {
         clearTimeout(this.timeout)
      },
      computed: {
         notificationTypeClass() {
            return `-text-${this.notification.type}`
         }
      },
      methods: mapActions('notificationModule', ['remove'])
   }
</script>

<style scoped>
   .notification-bar {
      margin: 1em 0 1em;
   }
   .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
   }
   .fade-enter, .fade-leave-to {
      opacity: 0;
   }
</style>