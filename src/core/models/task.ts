export type TaskType = 'running' | 'success' | 'error'

export interface Task {
  uuid: string
  status: TaskType
}
