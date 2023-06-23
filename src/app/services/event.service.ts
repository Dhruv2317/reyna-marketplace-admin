import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
 
@Injectable()
export class EventService {
  
 
  // Observable string sources
  private eventEmitted = new Subject<boolean>();
  private eventNewCommentEmitted = new Subject<string>();
  private eventRedirectEmitted = new Subject<boolean>();
 
  // Observable string streams
  changeObserver$ = this.eventEmitted.asObservable();
  newCommentObserver$ = this.eventNewCommentEmitted.asObservable();
  redirectObserver$ = this.eventRedirectEmitted.asObservable();
 
  // Service message commands
  eventChangeHandler(value: boolean) {
    this.eventEmitted.next(value);
  }
  eventAddedNewCommentHandler(length:any) {
    this.eventNewCommentEmitted.next(length);
  }
  eventRedirectHandler(arg0: boolean): any {
    this.eventRedirectEmitted.next(arg0);
  }
}