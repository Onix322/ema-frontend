import {Component, Inject, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatOption, MatSelect} from "@angular/material/select";
import {Car, CarState} from '../../../types/car.types';
import {ChangeStateDialogData} from '../../../types/dialog.types';
import {CarService} from '../../../service/car-service';
import {ApiResponse} from '../../../types/api-response.types';

@Component({
  selector: 'app-change-state-dialog',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatIcon,
    MatLabel,
    MatOption,
    MatSelect
  ],
  templateUrl: './change-state-dialog.html',
  styleUrls: ['./change-state-dialog.css', '../dialogs.css']
})
export class ChangeStateDialog {

  protected states = Object.keys(CarState)
  protected car: Car | null;
  @ViewChild(MatSelect)
  protected select!: MatSelect;

  constructor(@Inject(MAT_DIALOG_DATA) private data: ChangeStateDialogData, private carService: CarService, private dialogRef: MatDialogRef<ChangeStateDialog>) {
    this.car = this.data.car
  }

  protected submit() {
    console.log(this.car)
    if (!this.car) {
      console.error("No car.uuid sent")
      return
    }
    this.car.carState = this.select.value
    this.carService.changeState(this.car)
      .subscribe({
        next: (response) => {
          alert("Car state for " + response.data.numberPlate + " has been changed!")
          this.dialogRef.close(response)
        },
        error: err => {
          const errBody: ApiResponse<null> = {
            status: err.status,
            message: err.message,
            data: null
          }
          this.dialogRef.close(errBody)
          throw new Error(err.message)
        }
      })
  }
}
