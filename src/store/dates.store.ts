import { defineStore } from 'pinia'
import { PairDateDto } from '@models/date.ts'

export interface DatesInfo {
  id: number
  dates: PairDateDto[]
}
export const useDates = defineStore('dates', {
  state: () => {
    return {
      dates: new Array<DatesInfo>(),
    }
  },
  actions: {
    addNewDate(id: number, date: PairDateDto) {
      let candidate = this.dates.find((e) => e.id == id)
      if (!candidate) {
        candidate = {
          id,
          dates: [],
        }
        this.dates.push(candidate)
      }

      candidate.dates.push(date)
    },
  },
  getters: {
    getDatesById(): (id: number) => PairDateDto[] {
      return (id: number) => this.dates.find((e) => e.id == id)?.dates ?? []
    },
  },
  persist: true,
})
