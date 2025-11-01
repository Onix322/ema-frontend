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
import {FormsModule} from '@angular/forms';
import {EmployeeService} from '../../../service/employee-service';
import {CarService} from '../../../service/car-service';

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
  private static uuid: string | null = null
  @Input()
  protected name!: string;
  @Input()
  protected workingHours!: number;
  @Input()
  protected badge!: number;
  @Input()
  protected car: Car | null = null;
  @Input()
  protected role!: UserRole;

  protected roles: Array<UserRole>;
  protected cars: Array<Car>;

  constructor(private dc: DisplayContent, private employeeService: EmployeeService, private carService: CarService) {
    this.roles = Object.values(UserRole)
    this.cars = []
    this.getCars()
    this.getEmployee(AddEmployeeContent.uuid)
  }

  public static setUuid(uuid: string | null) {
    if (uuid == null) {
      this.uuid = null;
      return
    }
    this.uuid = uuid;
  }

  public getEmployee(uuid: string | null) {
    if (!uuid) return
    this.employeeService.get(uuid)
      .subscribe({
        next: (response) => {
          this.name = response.data.name
          this.workingHours = response.data.workingHours
          this.badge = response.data.badge
          this.car = response.data.car ? response.data.car : null
          this.role = UserRole[response.data.role as keyof typeof UserRole];

          console.log(response.data)
        }, error: (err) => {
          throw new Error(err)
        }
      })
  }

  protected getCars() {
    this.carService.getAllAvailable()
      .subscribe({
        next: (response) => {
          this.cars = response.data
        }, error: (err) => {
          throw new Error(err)
        }
      })
  }

  protected goBackAction() {
    return this.dc.displayContent(EmployeeContent, this.dc?.content?.nativeElement)
  }

  protected edit(body: UserData) {
    console.log("edit")
    console.log(body)
    this.employeeService.edit(body).subscribe({
      next: (response) => {
        alert("User (" + response.data.name + ") has been updated!")
      }, error: (err) => {
        throw new Error(err)
      }
    })
  }

  protected add(body: UserData) {
    console.log("add")
    this.employeeService.create(body).subscribe({
      next: (response) => {
        alert("User (" + response.data.name + ") has been created successfully!")
      }, error: (err) => {
        throw new Error(err.message)
      }
    })
  }

  protected submit(): void {

    const body: UserData = {
      uuid: AddEmployeeContent.uuid ?? null,
      car: this.car ?? null,
      role: this.role,
      workingHours: this.workingHours,
      badge: this.badge,
      name: this.name
    }

    console.log(body)

    body.uuid ? this.edit(body) : this.add(body)
  }
}
