import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DisplayContent} from '../../../service/display-content';
import {EmployeeContent} from '../employee-content/employee-content';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {UserRole} from '../../../types/user.types';

@Component({
  selector: 'app-add-employee-content',
  imports: [
    MatButton,
    MatIcon,
    MatLabel,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption
  ],
  templateUrl: './add-employee-content.html',
  styleUrls: ['./add-employee-content.css', '../content.css']
})
export class AddEmployeeContent {

  protected roles: Array<string | UserRole>;

  constructor(private dc: DisplayContent) {
    this.roles = Object.values(UserRole)
  }

  protected goBackAction() {
    return this.dc.displayContent(EmployeeContent, this.dc?.content?.nativeElement)
  }

}
