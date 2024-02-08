export type IncidentType = 'fire' | 'infrastructureDamage'

export interface Incident {
  type: IncidentType
  description?: string
}

export interface Flight {
  date: Date
  durationSec: number
  distanceMeters: number
  incidents?: Incident[]
  cargoWeightKg?: number
}

export interface UAV {
  id: string
  title: string
  flights: Flight[]
}

export interface TableData {
  date: string
  duration: string
  distance: number
  incidents: string
  cargo: string
}
