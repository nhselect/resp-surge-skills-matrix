import { NuxtState } from "@nuxt/types/app"

export const state = () => ({
  title: '',
  resources: [],
  saved: []
})

export const mutations = {
  add(state: NuxtState, resourceId: number | number[]) {
    if (Array.isArray(resourceId)) {
      state.resources = resourceId
    }
    else {
      state.resources.push(resourceId)
    }
  },

  remove(state: NuxtState, resourceId: number) {
    state.resources.splice(state.resources.indexOf(resourceId), 1)
  },

  move(state: NuxtState, resourceId: number, newIndex: number) {
    const oldIndex = state.resources.indexOf(resourceId)
    state.resources.splice(newIndex, 0, state.resources.splice(oldIndex, 1)[0])
  },

  clear(state: NuxtState) {
    state.title = '',
    state.resources = []
  },

  save(state: NuxtState, title: string, description: string, resources: number[]) {
    state.saved.push({
      title,
      resources,
      url: '?list=' + title + '|' + resources.join('|')
    })
  }
}