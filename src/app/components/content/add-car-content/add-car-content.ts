import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatLabel} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {DisplayContent} from '../../../service/display-content';
import {CarsContent} from '../cars-content/cars-content';
import {Car, CarState} from '../../../types/car.types';
import {FormsModule} from '@angular/forms';
import {CarService} from '../../../service/car-service';

@Component({
  selector: 'app-add-car-content',
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    FormsModule
  ],
  templateUrl: './add-car-content.html',
  styleUrls: ['./add-car-content.css', '../content.css']
})
export class AddCarContent {

  protected states: Array<CarState>;

  @Input()
  protected uuid!: string;
  @Input()
  protected numberPlate!: string;
  @Input()
  protected vin!: string;
  @Input()
  protected manufacturer!: string;
  @Input()
  protected state!: CarState;

  constructor(private dc: DisplayContent, private carService: CarService) {
    this.states = Object.values(CarState)
  }

  protected goBackAction() {
    return this.dc.displayContent(CarsContent, this.dc?.content?.nativeElement)
  }

  protected submit() {

    console.log("clicked")
    const body: Car = {
      uuid: null,
      manufacturer: this.manufacturer,
      vin: this.vin,
      carState: this.state,
      numberPlate: this.numberPlate
    }

    console.log(body)
    this.carService.create(body)
      .subscribe({
        next: (response) => {
          alert("Car with id: " + response.data.uuid + " has been created!")
        },
        error: (err) => {
          throw new Error(err)
        }
      })
  }
}
