import { defineStore } from 'pinia'

export interface ITaskState {
  tasksUuids: string[]
}

export const useTasks = defineStore({
  id: 'tasks',
  state(): ITaskState {
    return {
      tasksUuids: [],
    }
  },
  actions: {
    addNewTask(uuid: string) {
      this.tasksUuids.push(uuid)
    },
    removeTasks(uuids: string[]) {
      for (let index = 0; index < this.tasksUuids.length; index++) {
        const uuid = this.tasksUuids[index]
        if (uuids.includes(uuid)) continue

        this.tasksUuids.splice(index, 1)
      }
    },
  },
  persist: true,
})
