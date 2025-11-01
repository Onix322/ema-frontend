import {ChangeDetectionStrategy, Component, Inject, ViewChild} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatIcon} from '@angular/material/icon';
import {AssignCarDialogData} from '../../service/dialog.types';
import {UserData} from '../../types/user.types';
import {Car} from '../../types/car.types';
import {EmployeeService} from '../../service/employee-service';
import {ApiResponse} from '../../types/api-response.types';

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.html',
  styleUrl: './assign-dialog.css',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogClose, MatSelect, MatIcon, MatOption],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignDialog {

  protected employee: UserData | null = null;
  protected cars: Car[] = [];
  protected carSelected: Car | null = null;
  @ViewChild(MatSelect)
  private matSelect!: MatSelect;

  constructor(@Inject(MAT_DIALOG_DATA) private data: AssignCarDialogData, private employeeService: EmployeeService, private dialog: MatDialogRef<AssignDialog>) {
    if (!this.data.employee) {
      throw new Error("No employee found for Assign Car Dialog")
    }
    this.employee = data.employee
    this.cars = data.availableCars
  }

  protected assignCar() {
    console.log(this.matSelect.value)
    if (!this.employee || !this.employee.uuid || this.cars.length == 0 || !this.matSelect.value) return
    this.employeeService.assignCar(this.employee.uuid, this.matSelect.value)
      .subscribe({
        next: (response) => {
          alert("Car " + response.data.car?.numberPlate + " has been assign to " + response.data.name)
          this.data.employee = response.data
          this.dialog.close(response)
        },
        error: (err) => {
          this.dialog.close((): ApiResponse<null> => {
            return {
              status: err.status,
              message: err.message,
              data: null
            }
          })
          throw new Error(err.message)
        }
      })
  }
}
