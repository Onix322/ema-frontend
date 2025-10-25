export interface Car {
  id: string,
  numberPlate: string,
  vin: string,
  manufacturer: string,
  state: string //describes the state of the car e.g.: 'MECHANIC', 'GROUNDED', 'AVAILABLE', 'ASSIGNED'
}

export enum CarState{
  MECHANIC = 'Mechanic',
  GROUNDED = 'Grounded',
  AVAILABLE = 'Available',
  ASSIGNED = 'Assigned',
  STANDBY = 'Standby',
}
