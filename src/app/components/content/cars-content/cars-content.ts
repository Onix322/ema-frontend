import {AfterViewInit, Component, signal, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
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
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Car} from '../../../types/car.types';
import {DisplayContent} from '../../../service/display-content';
import {AddCarContent} from '../add-car-content/add-car-content';
import {CarService} from '../../../service/car-service';
import {ApiResponse} from '../../../types/api-response.types';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ChangeStateDialog} from '../../dialogs/change-state-dialog/change-state-dialog';
import {ChangeStateDialogData} from '../../../types/dialog.types';
import {ReactiveFormsModule} from '@angular/forms';
import {NotificationService} from '../../../service/notification-service';
import {NotificationImportance} from '../../notification/notification';

@Component({
  selector: 'app-cars-content',
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatIcon,
    MatInput,
    MatPaginator,
    MatSort,
    MatTable,
    MatHeaderCellDef,
    MatNoDataRow,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatProgressSpinner,
    MatFormField,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './cars-content.html',
  styleUrls: ['./cars-content.css', '../content.css']
})
export class CarsContent implements AfterViewInit {

  displayedColumns: string[] = ['actions', 'numberPlate', 'vin', 'manufacturer', 'state'];
  dataSource: MatTableDataSource<Car>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  protected fetchingData = signal(false)

  constructor(private notificationService: NotificationService, private dc: DisplayContent, private carService: CarService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource()
  }

  ngAfterViewInit() {
    this.getAll()
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  protected openDialog(car: Car){
    const body: ChangeStateDialogData = {
      car: car
    }
    const dialogRef = this.dialog.open(ChangeStateDialog, {
      data: body
    })

    this.updateDataSourceAfterDialogClosed(dialogRef)
  }

  protected goToAdd(){
    AddCarContent.setUuid(null)
    return this.dc.displayContent(AddCarContent, this.dc.content?.nativeElement)
  }

  protected goToEdit(uuid: string){
    AddCarContent.setUuid(uuid)
    return this.dc.displayContent(AddCarContent, this.dc.content?.nativeElement)
  }

  protected applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  protected deleteCar(uuid: string) {
    this.carService.delete(uuid)
      .subscribe({
        next: response => {
          this.notificationService.notify({
            title: `Car has been deleted!`,
            message: `Car has been deleted successfully!`,
            importance: NotificationImportance.ACCEPTED
          })
          this.dataSource.data = this.dataSource.data.filter(c => c.uuid !== uuid)
        },
        error: (err) => {
          this.notificationService.notify({
            title: `Car cannot be deleted`,
            message: `${err.message}`,
            importance: NotificationImportance.ACCEPTED
          })
          throw new Error(err.message)
        }
      })
  }

  private getAll() {
    this.fetchingData.set(true)
    setTimeout(() => {
      this.carService.getAll()
        .subscribe({
          next: (response: ApiResponse<Car[]>) => {
            this.dataSource.data = [...response.data];
            this.fetchingData.set(false)
          },
          error: (err) => {
            this.fetchingData.set(false)
            throw new Error(err)
          }
        })
    }, 500)
  }

  private updateDataSourceAfterDialogClosed(dialogRef: MatDialogRef<ChangeStateDialog>) {
    dialogRef.afterClosed().subscribe({
      next: (response: ApiResponse<Car>) => {
        if(response.data == null) {
          this.notificationService.notify({
            title: "State cannot be updated",
            message: `${response.message}`,
            importance: NotificationImportance.ERROR
          })
          return
        }
        this.updateDataSource(response.data.uuid, response.data)

        this.notificationService.notify({
          title: "State has been updated",
          message: `${response.message}`,
          importance: NotificationImportance.ACCEPTED
        })
      }
    })
  }

  private updateDataSource(uuid: string | null, newCar: Car) {
    if (!uuid) {
      throw new Error("Uuid is mandatory")
    }
    const index = this.dataSource.data.findIndex(e => e.uuid === uuid);
    this.dataSource.data[index] = newCar;
    this.dataSource.data = [...this.dataSource.data];
  }
}

