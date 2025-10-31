export enum CarState {
  NONE = 'NONE',
  MECHANIC = 'MECHANIC',
  GROUNDED = 'GROUNDED',
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
  ASSIGNED = 'ASSIGNED',
  STANDBY = 'STANDBY',
}

export interface Car {
  uuid: string | null,
  numberPlate: string,
  vin: string,
  manufacturer: string,
  carState: CarState
}

