import { ActionContext, ActionTree } from 'vuex'
import EventService from '@/services/EventService.js'
import { State } from '../index'

export interface EventState {
  events: IEvent[]
  eventsTotal: number
  event: IEvent
}

export interface IEvent {
  id?: number
  title?: string
  date?: string
  time?: string
  location?: string
  description?: string
  organizer?: string
  category?: string
  attendees?: Array<{ id: string; name: string }>
}

export const namespaced = true

export const state: EventState = {
  events: [],
  eventsTotal: 0,
  event: {}
}

export const actions: ActionTree<EventState, State> = {
  createEvent({ commit, dispatch }: ActionContext<EventState, State>, event: IEvent) {
    return EventService.postEvent<IEvent>(event, (response) => response)
    // return EventService.postEvent(event)
    //   .then(() => {
    //     commit('ADD_EVENT', event)
    //     const notification = {
    //       type: 'success',
    //       message: 'Your event has been created!'
    //     }
    //     dispatch('notification/add', notification, { root: true })
    //   })
    //   .catch((error) => {
    //     const notification = {
    //       type: 'error',
    //       message: 'There was a problem creating your event: ' + error.message
    //     }
    //     dispatch('notification/add', notification, { root: true })
    //     throw error
    // })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((response) => {
        commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
        commit('SET_EVENTS', response.data)
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    var event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then((response) => {
          commit('SET_EVENT', response.data)
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching event: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  }
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}



export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id)
  }
}
