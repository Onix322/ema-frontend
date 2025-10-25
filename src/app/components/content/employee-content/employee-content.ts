import {AfterViewInit, Component, Type, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';
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
import {UserData, UserRole} from '../../../types/user.types';
import {DisplayContent} from '../../../service/display-content';
import {AddEmployeeContent} from '../add-employee-content/add-employee-content';


const NAMES: string[] = [
  'Alexandru Dobos',
  'David Ciocanle',
  'Victor Corcoata',
  'George-Eric Patrut',
  'Benny Wagner',
  'Mahmoud',
  'Thomas',
  'Markus',
];

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
    MatSort
  ],
  templateUrl: './employee-content.html',
  styleUrls: ['./employee-content.css', '../content.css']
})
export class EmployeeContent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'car', 'workingHours', 'badge', 'role'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  protected readonly AddEmployeeContent = AddEmployeeContent;

  constructor(private dc: DisplayContent) {
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    const users = Array.from({length: NAMES.length}, (_, k) => createNewUser(k));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
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
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {

  return {
    id: id.toString(),
    name: NAMES[id],
    workingHours: Math.round(Math.random() * 48),
    car: "M AZ 2833",
    badge: Math.round(Math.random() * 2000000),
    role: Object.values(UserRole)[Math.round(Math.random())]
  };
}
