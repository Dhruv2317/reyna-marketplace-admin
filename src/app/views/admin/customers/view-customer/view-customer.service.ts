import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject }    from 'rxjs';

@Injectable()
export class ViewCustomerService {
    constructor(private _http: HttpClient) { }

    private customerDetailsSource = new Subject<any>();
    private customerDetailsSource2 = new Subject<any>();
    
    // Observable string streams
    customerDetailsPublished$ = this.customerDetailsSource.asObservable();
    customerDetailsSubscribed$ = this.customerDetailsSource2.asObservable();

    // Service message commands
    publishCustomerDetails(customer: any) {
        this.customerDetailsSource.next(customer);
    }

    subscribeCustomerDetails() {
        this.customerDetailsSource2.next();
    }

}