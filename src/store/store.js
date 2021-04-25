import Vue from 'vue';
import Vuex from 'vuex';
import * as userModule from './modules/user';
import * as eventsModule from './modules/event';
import * as notificationModule from './modules/notification';

Vue.use(Vuex)

export default new Vuex.Store({
   modules: {
      userModule,
      eventsModule,
      notificationModule
   },
   state: {
      categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community']
   },
})
