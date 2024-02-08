import type { UAV, Incident, IncidentType, Flight } from './types'

const getRandomDate = (start: Date, end: Date): Date =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))

const generateRandomIncidents = (): Incident[] => {
  const incidents: Incident[] = []
  const numIncidents = Math.floor(Math.random() * 8)
  const incidentTypes: IncidentType[] = ['fire', 'infrastructureDamage']

  for (let i = 0; i < numIncidents; i++) {
    const typeIndex = Math.floor(Math.random() * incidentTypes.length)
    const incidentType = incidentTypes[typeIndex]
    incidents.push({
      type: incidentType,
      description: `Описание инцидента`,
    })
  }

  return incidents
}

const generateRandomFlights = (): Flight[] => {
  const flights: Flight[] = []
  const numFlights = Math.floor(Math.random() * 10) + 1

  for (let i = 0; i < numFlights; i++) {
    flights.push({
      date: getRandomDate(new Date(2023, 0, 1), new Date()),
      durationSec: Math.floor(Math.random() * 36000),
      distanceMeters: Math.floor(Math.random() * 9900 + 100),
      incidents: generateRandomIncidents(),
      cargoWeightKg: Math.floor(Math.random() * 10),
    })
  }

  return flights
}

export const UAVsData: UAV[] = [
  {
    id: '1012009',
    title: 'БПЛА №1 (модель 100)',
    flights: generateRandomFlights(),
  },
  {
    id: '2023020',
    title: 'БПЛА №2 (модель 200)',
    flights: generateRandomFlights(),
  },
  {
    id: '3034991',
    title: 'БПЛА №3 (модель 300)',
    flights: generateRandomFlights(),
  },

  {
    id: '3934991',
    title: 'БПЛА №3 (модель 100)',
    flights: generateRandomFlights(),
  },
]
