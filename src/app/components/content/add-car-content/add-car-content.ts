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

  protected static uuid: string | null = null;
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
    this.initMode(AddCarContent.uuid)
  }

  public static setUuid(uuid: string | null){
    AddCarContent.uuid = uuid
  }

  protected goBackAction() {
    return this.dc.displayContent(CarsContent, this.dc?.content?.nativeElement)
  }

  private initMode(uuid: string | null){
    if(uuid && uuid.trim() != ""){
      this.carService.get(uuid)
        .subscribe({
          next: (response) => {
            this.numberPlate = response.data.numberPlate
            this.vin = response.data.vin
            this.manufacturer = response.data.manufacturer
            this.state = response.data.carState
          }
        })
    }
  }
  private edit(uuid: string){
    console.log("edit")
    const body: Car = {
      uuid: uuid,
      vin: this.vin,
      manufacturer: this.manufacturer,
      carState: this.state,
      numberPlate: this.numberPlate
    }
    this.carService.update(body)
      .subscribe({
        next: (response) => {
          alert("Car " + response.data.numberPlate + " has been updated!")
        },
        error: (err) => {
          throw new Error(err.message)
        }
      })
  }

  private add(){
    console.log("add")
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

  protected submit() {
    if(AddCarContent.uuid && AddCarContent.uuid?.trim() != "") {
      this.edit(AddCarContent.uuid)
    } else this.add()
  }
}
