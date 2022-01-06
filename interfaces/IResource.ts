import { IObjective } from './index'

export interface IResource {
  id: number
  title: string
  description: string
  format: string
  content: string
  duration: number
  keywords: string[]
  domain: string
  care_level: string
  staff: string[]
  mapped_skills: IObjective[]
  url: string
  uploadDate: Date
  slug: string
  search: string
}