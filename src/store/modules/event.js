import EventService from '../../services/EventService';

export const state = {
   events: [],
   totalPages: 0,
   event: {}
}

export const mutations = {
   ADD_EVENT(state, event) {
      state.events.push(event);
   },
   SET_EVENTS(state, events) {
      state.events = events;
      
   },
   SET_TOTAL_PAGES(state, total) {
      state.totalPages = total;
   },
   SET_EVENT(state, event) {
      state.event = event
   }
}

export const actions = {
   createEvent({commit, dispatch}, event) {
      return EventService.postEvent(event).then(() => {
         commit('ADD_EVENT', event);
         const notification = {
            type: 'success',
            message: 'Your event has been created'
         };
         dispatch('notificationModule/add', notification, { root: true });
      }).catch((error) => {
         const notification = {
            type: 'error',
            message: 'There was a problem creating your event: ' + error.message
         };
         dispatch('notificationModule/add', notification, { root: true });
         throw error;
      });
   },
   fetchEvents({commit, dispatch}, {perPage, page}) {
      EventService.getEvents(perPage, page)
         .then(response => {
            commit('SET_EVENTS', response.data);
            commit('SET_TOTAL_PAGES', parseInt(response.headers['x-total-count']))
         })
         .catch(error => {
            const notification = {
               type: 'error',
               message: 'There was a problem fetching events: ' + error.message
            };
            dispatch('notificationModule/add', notification, { root: true });
         })
      },
   fetchEvent({commit, dispatch, getters}, id) {
      const event = getters.getEventById(id);

      if (event) {
         commit('SET_EVENT', event);
      } else {
         EventService.getEvent(id)
            .then(response => {
               commit('SET_EVENT', response.data)
            })
            .catch(error => {
               const notification = {
                  type: 'error',
                  message: 'There was a problem fetching the event: ' + error.message
               };
               dispatch('notificationModule/remove', notification, { root: true });
            })
         }
      }
}

export const getters = {
   getCategories: state => state.categories,
   catLength: state => state.categories.length,
   doneTodos: state => state.todos.filter(todo => todo.done),
   activeTodosCount: state => state.todos.filter(todo => !todo.done).length,
   getEventById: state => id => state.events.find(event => event.id === id)
}