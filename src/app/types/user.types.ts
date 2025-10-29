import {Car} from './car.types';

export interface UserData {
  uuid: string | null;
  name: string;
  car: Car | null;
  workingHours: number;
  badge: number;
  role: string;
}

export enum UserRole {
  ADMIN = 'ADMIN', USER = 'USER'
}
