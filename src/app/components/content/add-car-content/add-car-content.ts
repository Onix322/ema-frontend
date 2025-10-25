import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatLabel} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {DisplayContent} from '../../../service/display-content';
import {CarsContent} from '../cars-content/cars-content';
import {CarState} from '../../../types/car.types';

@Component({
  selector: 'app-add-car-content',
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect
  ],
  templateUrl: './add-car-content.html',
  styleUrls: ['./add-car-content.css', '../content.css']
})
export class AddCarContent {

  protected states: Array<string | CarState>;

  constructor(private dc: DisplayContent) {
    this.states = Object.values(CarState)
  }

  protected goBackAction(){
    return this.dc.displayContent(CarsContent, this.dc?.content?.nativeElement)
  }
}
