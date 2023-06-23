import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject,Observable } from "rxjs";

@Injectable({providedIn:"root"})
export class notificationHelper {

    constructor(private _http: HttpClient) {}

  	public smsCountChange: BehaviorSubject<number> = new BehaviorSubject<number>(0);


    getNotificationIcon(notification_event:string){
		if(notification_event=='ORDER_COMMENT'){
		  return 'mr-3 fas fa-2x fa-comment text-primary';
		}
		else if(notification_event=='ORDER_APPROVED'){
		  return 'mr-3 fas fa-2x fa-check-circle text-success';
		}
		else if(notification_event=='ORDER_SHIPPED'){
		  return 'mr-3 fas fa-2x fa-truck text-success';
		}
		else if(notification_event=='REJECTED'){
		  return 'mr-3 fas fa-2x fa-ban text-danger';
		}
		else if(notification_event=='ORDER_REFUNDED'){
			return 'mr-3 fas fa-2x fa-usd text-success';
	    }else{
          return 'mr-3 fas fa-2x fa-exclamation-circle text-info'
        }
	}

  clickNotification(loggedInUser:any,notification:any,_router:any){
    if(notification.read_at==null){
        this.readNotification([notification.id]);
    }

  }

  async readNotification(notificationIds:number[]) {
      return await this._http.post(`api/notifications/markAsRead`,{ids:notificationIds}).toPromise();
  }

  async readAllNotification(){
      return await this._http.post(`api/notifications/markAllAsRead`,{}).toPromise();
  }


}
