export interface Car {
  uuid: string | null,
  numberPlate: string,
  vin: string,
  manufacturer: string,
  carState: CarState //describes the state of the car e.g.: 'MECHANIC', 'GROUNDED', 'AVAILABLE', 'ASSIGNED'
}

export enum CarState {
  MECHANIC = 'MECHANIC',
  GROUNDED = 'GROUNDED',
  AVAILABLE = 'AVAILABLE',
  ASSIGNED = 'ASSIGNED',
  STANDBY = 'STANDBY',
}
