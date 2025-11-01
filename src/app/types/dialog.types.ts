import {UserData} from './user.types';
import {Car, CarState} from './car.types';

export type AssignCarDialogData = {
  employee: UserData | null,
  availableCars: Car[]
}

export type ChangeStateDialogData = {
  car: Car | null
}
