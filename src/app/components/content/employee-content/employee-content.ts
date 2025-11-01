import {AfterViewInit, Component, signal, Type, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatInput} from '@angular/material/input';
import {UserData} from '../../../types/user.types';
import {DisplayContent} from '../../../service/display-content';
import {AddEmployeeContent} from '../add-employee-content/add-employee-content';
import {EmployeeService} from '../../../service/employee-service';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {AssignDialog} from '../../assign-dialog/assign-dialog';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {map, switchMap} from 'rxjs';
import {CarService} from '../../../service/car-service';
import {AssignCarDialogData} from '../../../service/dialog.types';
import {ApiResponse} from '../../../types/api-response.types';


@Component({
  selector: 'app-employee-content',
  imports: [
    MatButton,
    MatIcon,
    MatTable,
    MatPaginator,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef,
    MatRow,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatNoDataRow,
    MatInput,
    MatSort,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatIconButton,
    MatProgressSpinner,
    MatDialogModule
  ],
  templateUrl: './employee-content.html',
  styleUrls: ['./employee-content.css', '../content.css']
})
export class EmployeeContent implements AfterViewInit {

  displayedColumns: string[] = ['actions', 'name', 'car', 'workingHours', 'badge', 'role'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(AssignDialog) assignDialog!: AssignDialog;
  protected readonly AddEmployeeContent = AddEmployeeContent;
  protected fetchingData = signal(false)

  constructor(private dc: DisplayContent, private employeeService: EmployeeService, private dialog: MatDialog, private carService: CarService) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.getAll()

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  protected displayContent<C>(component: Type<C>) {
    return this.dc.displayContent(component, this.dc.content?.nativeElement)
  }

  protected deleteUser(uuid: string) {
    return this.employeeService.delete(uuid).subscribe({
      next: (response) => {
        this.dataSource.data = this.dataSource.data.filter(x => x.uuid !== uuid);
        this.dataSource._updateChangeSubscription();
        alert("User deleted");
        console.log(response)
      },
      error: (err) => {
        throw new Error(err)
      }
    })
  }

  protected goToAdd() {
    AddEmployeeContent.setUuid(null)
    this.displayContent(AddEmployeeContent)
  }

  protected goToEdit(uuid: string) {
    AddEmployeeContent.setUuid(uuid)
    this.displayContent(AddEmployeeContent)
  }

  protected openDialog(uuid: string) {
    const body: AssignCarDialogData = {
      employee: null,
      availableCars: []
    }
    this.employeeService.get(uuid)
      .pipe(
        map((response): AssignCarDialogData => {
          body.employee = response.data
          return body
        }),
        switchMap(() => this.carService.getAllAvailable()),
        map((cars) => {
          body.availableCars = cars.data
          return body
        })
      )
      .subscribe({
        next: (value) => {
          const dialogRef = this.dialog.open(AssignDialog, {
            data: value,
            width: '100%',
            maxWidth: "500px"
          })
          this.updatedDialogAfterClosedSuccessfully(dialogRef)
        }
      })
  }

  protected unassignCar(uuid: string) {
    this.employeeService.unassignCar(uuid)
      .subscribe({
        next: (response) => {
          alert("Car has been unassigned!")
          this.updateUser(response.data.uuid, response.data)
        },
        error: (err) => {
          throw new Error(err)
        }
      })
  }

  private getAll() {
    this.fetchingData.set(true)
    setTimeout(() => {
      this.employeeService.getAll().subscribe({
        next: (response) => {
          this.dataSource.data = [...response.data]
          this.fetchingData.set(false)
        },
        error: (err) => {
          this.dataSource.disconnect()
          this.fetchingData.set(false)
          throw new Error(err)
        }
      })
    }, 500)
  }

  private updatedDialogAfterClosedSuccessfully(dialogRef: MatDialogRef<AssignDialog>) {
    dialogRef.afterClosed()
      .subscribe({
        next: (response: ApiResponse<any>) => {
          if (response.data != null) {
            this.updateUser(response.data.uuid, response.data)
          }
        }
      })
  }

  private updateUser(uuid: string | null, newUser: UserData) {
    if (!uuid) {
      throw new Error("Uuid is mandatory")
    }
    const index = this.dataSource.data.findIndex(e => e.uuid === uuid);
    this.dataSource.data[index] = newUser;
    this.dataSource.data = [...this.dataSource.data];
  }
}
