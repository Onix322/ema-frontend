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

const CARS = [
  "M AZ 2833",
  "WI AM 3535"
]

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

  displayedColumns: string[] = ['id', 'numberPlate', 'vin', 'manufacturer', 'state'];
  dataSource: MatTableDataSource<Car>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dc: DisplayContent) {
    // Create 100 cars
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k));

    const cars = Array.from({length: CARS.length}, (_, k) => createNewCar(k));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(cars);
  }

  ngAfterViewInit() {
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
}

/** Builds and returns a new User. */
function createNewCar(id: number): Car {
  const states = Object.values(CarState)
  return {
    id: id.toString(),
    numberPlate: id.toString(),
    manufacturer: CARS[id],
    vin: CARS[id],
    state: states[Math.round(Math.random() * states.length - 1)]
  };
}
