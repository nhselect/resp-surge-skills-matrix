import { NuxtState } from "@nuxt/types/app"
import { IFilter } from "~/interfaces"

export const state = () => ({
  filter: <IFilter>{
    text: 'test search string',
    duration: 0,
    formats: [],
    caresetting: '',
    staff: '',
  }
})

export const mutations = {
  set(state: NuxtState, filter: IFilter) {
    state.filter = filter
  },

  clear(state: NuxtState) {
    state.filter = {
      text: '',
      duration: 0,
      formats: [],
      caresetting: '',
      staff: '',
    }
  }
}