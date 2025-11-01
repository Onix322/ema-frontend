import {UserData} from '../types/user.types';
import {Car} from '../types/car.types';

export type AssignCarDialogData = {
  employee: UserData | null,
  availableCars: Car[]
}
