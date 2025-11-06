import {Component, ElementRef, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
  providers: [],
})
export class Notification {
  @Output()
  protected title: string | undefined;
  @Output()
  protected message: string | undefined;
  @Output()
  protected importance: NotificationImportance | undefined;
  protected readonly NotificationImportance = NotificationImportance;
  @ViewChild('notification')
  protected notificationRef!: ElementRef<HTMLElement>;

  constructor() {
  }

  public create(data?: { title: string, message: string, importance: NotificationImportance }) {
    this.title = data?.title
    this.message = data?.message
    this.importance = data?.importance

  }
}

export enum NotificationImportance {
  IMPORTANT, NORMAL, ACCEPTED, ERROR, WARNING
}
