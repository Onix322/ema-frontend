import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-employee-content',
  imports: [
    MatButton,
    MatIcon
  ],
  templateUrl: './employee-content.html',
  styleUrls: ['./employee-content.css', '../content.css']
})
export class EmployeeContent {

}
