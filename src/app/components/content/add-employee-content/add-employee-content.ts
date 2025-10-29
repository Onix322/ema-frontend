import {Component, Input} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DisplayContent} from '../../../service/display-content';
import {EmployeeContent} from '../employee-content/employee-content';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {UserData, UserRole} from '../../../types/user.types';
import {Car} from '../../../types/car.types';
import {FormBuilder, FormsModule} from '@angular/forms';
import {EmployeeService} from '../../../service/employee-service';

@Component({
  selector: 'app-add-employee-content',
  imports: [
    MatButton,
    MatIcon,
    MatLabel,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    FormsModule
  ],
  standalone: true,
  providers: [EmployeeService],
  templateUrl: './add-employee-content.html',
  styleUrls: ['./add-employee-content.css', '../content.css']
})
export class AddEmployeeContent {

  @Input()
  protected name!: string;
  @Input()
  protected workingHours!: number;
  @Input()
  protected badge!: number;
  @Input()
  protected car!: Car | null | "none";
  @Input()
  protected role!: UserRole;

  protected roles: Array<UserRole>;

  constructor(private dc: DisplayContent, private employeeService: EmployeeService, private fromBuilder: FormBuilder) {
    this.roles = Object.values(UserRole)
  }

  protected goBackAction() {
    return this.dc.displayContent(EmployeeContent, this.dc?.content?.nativeElement)
  }

  protected submit() {

    this.car = this.car == "none" ? null : this.car

    const body: UserData = {
      uuid: null,
      name: this.name,
      car: this.car,
      workingHours: this.workingHours,
      badge: this.badge,
      role: this.role
    }

    this.employeeService.create(body).subscribe({
      next: (response) => {
        console.log(response)
        alert("User " + response.data.uuid + "(" + response.data.name + ") has been created successfully!")
      },
      error: (err) => {
        throw new Error(err)
      }
    })
  }
}
