import { Injectable, ViewContainerRef } from '@angular/core';
import * as moment from "moment-timezone";
import { UntypedFormGroup } from '@angular/forms';

@Injectable()
export class Helper {

    public IST_DATE_TIME_FORMAT = 'DD/MM/YYYY hh:mm:ss A';
    public IST_DATE_FORMAT = 'DD/MM/YYYY';

    calculateAge(dateOfBirth: string, format: string = "DD/MM/YYYY") {
        var curDate = moment();
        var bDate = moment(dateOfBirth, format);
        return curDate.diff(bDate, 'years');
    }

    public getFormattedDateFromUnixTimestamp(timestamp:number,format=this.IST_DATE_TIME_FORMAT){
      return moment.unix(timestamp).local().format(format);
    }

    getFormattedDate(date: string, format: string = 'DD/MM/YYYY') {
        return date ? moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format(format):'';
    }

    getInINRFormat(currency: string, data: number) {
        switch (currency) {
            case 'EUR':
                return Number(data).toLocaleString('en-US', { style: 'currency', currency: 'EUR' })
            case 'INR':
                return Number(data).toLocaleString('en-US', { style: 'currency', currency: 'INR' })
            case 'USD':
                return Number(data).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
            case 'GBP':
                return Number(data).toLocaleString('en-US', { style: 'currency', currency: 'GBP' })       
            default:
                return Number(data).toLocaleString('en-US', { style: 'currency', currency: currency })       
        }
    }

    getProductStatus(status:string){
        if(status=='draft'){
            return `<span class="badge badge-warning">Draft</span>`;
        }
        else if(status=='under_review'){
            return `<span class="badge badge-primary">Under Review</span>`;
        }
        else if(status=='published'){
            return `<span class="badge badge-success">Published</span>`;
        }
        else if(status=='rejected'){
            return `<span class="badge badge-dark">Rejected</span>`;
        }
        else if(status=='update_required'){
            return `<span class="badge badge-info">Update Required</span>`;
        }
        else if(status=='deleted'){
            return `<span class="badge badge-danger">Deleted</span>`;
        }
        else if(status=='sold_out'){
            return `<span class="badge badge-dark">Sold Out</span>`;
        }
        else if(status=='out_of_stock'){
            return `<span class="badge badge-danger">Out of stock</span>`;
        }
        else {
            return `<span class="badge badge-warning">${status}</span>`;
        }
    }


    public getUTCtoLocalDateTime(date: any, format: string = this.IST_DATE_TIME_FORMAT) {
        if (date != null && moment(date).isValid()) {
            return moment.utc(date).local().format(format);
        } else {
            return date;
        }
    }


    /* DIDN'T GIVE EXPECTED OUTPUT */
    public getESTDateTime(date: any) {
        if (date != null && moment(date).isValid()) {
            return moment.tz(date, 'Asia/Calcutta').format(this.IST_DATE_TIME_FORMAT);
        } else {
            return date;
        }
    }

    /**
  * Marks all controls in a form group as touched
  * @param formGroup - The form group to touch
  */
    public markFormGroupTouched(formGroup: UntypedFormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control: any) => {
            control.markAsTouched();

            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }

 
}
