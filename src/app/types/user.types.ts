export interface UserData {
  id: string;
  name: string;
  car: string;
  workingHours: number;
  badge: number;
  role: string;
}

export enum UserRole {
  ADMIN = 'Admin', USER = 'User'
}
