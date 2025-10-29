import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';
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
import {MatInput} from '@angular/material/input';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Car, CarState} from '../../../types/car.types';
import {DisplayContent} from '../../../service/display-content';
import {AddCarContent} from '../add-car-content/add-car-content';
import {CarService} from '../../../service/car-service';
import {ApiResponse} from '../../../types/api-response.types';

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
    MatRowDef
  ],
  templateUrl: './cars-content.html',
  styleUrls: ['./cars-content.css', '../content.css']
})
export class CarsContent implements AfterViewInit {

  displayedColumns: string[] = ['numberPlate', 'vin', 'manufacturer', 'state'];
  dataSource: MatTableDataSource<Car>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dc: DisplayContent, private carService: CarService) {
    this.dataSource = new MatTableDataSource()
  }

  ngAfterViewInit() {
    this.getAll()
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  protected displayContent(){
    return this.dc.displayContent(AddCarContent, this.dc.content?.nativeElement)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getAll(){
    //get them
    this.carService.getAll()
      .subscribe({
        next: (response: ApiResponse<Car[]>) => {
          this.dataSource = new MatTableDataSource(response.data);
        },
        error: (err) => {
          throw new Error(err)
        }
      })
  }
}

