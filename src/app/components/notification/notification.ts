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
  @Output()
  protected message: string = "";
  @Output()
  protected importance: NotificationImportance = NotificationImportance.NORMAL
  protected readonly NotificationImportance = NotificationImportance;


  //create notification service witch will take an element where to append the notification, and data

  public notify(data: { title: "", message: "", importance: NotificationImportance.NORMAL }) {
     //! CREATE notify logic))
  }
}

export enum NotificationImportance {
  IMPORTANT, NORMAL, ACCEPTED, ERROR, WARNING
}
