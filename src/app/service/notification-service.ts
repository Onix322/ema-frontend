import {Injectable, ViewContainerRef} from '@angular/core';
import {Notification, NotificationImportance} from '../components/notification/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private vcr!: ViewContainerRef;

  constructor() {

  }

  public setHost(host: ViewContainerRef) {
    this.vcr = host
  }

  public notify(data?: { title: string, message: string, importance: NotificationImportance }) {

    const compRef = this.vcr.createComponent(Notification)
    compRef.instance.create(data)
    setTimeout(() => {
      compRef.destroy()
    },4000)
  }
}
