import {Component, Output} from '@angular/core';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification {

  @Output()
  protected title: string = "";

}
