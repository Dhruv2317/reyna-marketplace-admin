import { Injectable } from '@angular/core';

@Injectable()
export class orderHelper {

    
      getSellerDealerStatus(status:string) {
        let badge='';
        if (status == 'APPROVED') {
          badge= `<span class='badge badge-pill badge-primary p-2'>Approved</span>`;
        }
        else if (status == 'REJECTED'){
          badge= `<span class='badge badge-pill badge-danger p-2'>Rejected</span>`;
        }
        else if(status == 'PAYMENT_COMPLETED'){
          badge= `<span class='badge badge-pill badge-warning p-2'>Payment Completed</span>`;
        }
        else if(status == 'PROCESSING'){
          badge= `<span class='badge badge-pill badge-info p-2'>Processing</span>`;
        }
        else if(status == 'SHIPPED'){
          badge= `<span class='badge badge-pill badge-success p-2'>Shipped</span>`;
        }
        else if(status == 'DELIVERED'){
          badge= `<span class='badge badge-pill badge-dark p-2'>Delivered</span>`;
        }
        else if (status == 'REFUND_REQUESTED') {
          badge= `<span class='badge badge-pill badge-danger p-2'>Refund Requested</span>`;
        }
        else if (status == 'REFUND_PROCESSED') {
          badge= `<span class='badge badge-pill badge-danger p-2'>Refund Processed</span>`;
        } else {
          badge= `<span class='badge badge-pill badge-info p-2'>Received</span>`;
        }
        return badge;
      }


    getCustomerStatus(status:string) {
      let badge='';
      if (status == 'UNDER_REVIEW'){
        badge= `<span class='badge  badge-pill badge-info p-2'>Under Review</span>`;
      }
      else if (status == 'PAYMENT_REQUIRED') {
        badge= `<span class='badge  badge-pill badge-warning  p-2'>Payment required</span>`;
      }
      else if(status == 'UNDER_PROCESS'){
        badge= `<span class='badge badge-pill badge-info p-2'>Under Process</span>`;
      }
      else if(status == 'ORDER_PLACED'){
        badge= `<span class='badge badge-pill badge-primary p-2'>Order Placed</span>`;
      }
      else if (status == 'REJECTED'){
        badge= `<span class='badge  badge-pill badge-danger  p-2'>Rejected</span>`;
      }
      else if (status == 'CANCLLED'){
        badge= `<span class='badge  badge-pill badge-warning  p-2'>Canclled</span>`;
      }
      else if(status == 'SHIPPING'){
        badge= `<span class='badge badge-pill badge-success p-2'>Shipped</span>`;
      }
      else if(status == 'DELIVERED'){
        badge= `<span class='badge badge-pill badge-dark p-2'>Delivered</span>`;
      }
      else if (status == 'REQUEST_REFUND'){
        badge= `<span class='badge  badge-pill badge-danger  p-2'>Requested for Refund</span>`;
      } 
      else if (status == 'REFUNDED'){
        badge= `<span class='badge  badge-pill badge-danger  p-2'>Refunded</span>`;
      } else {
        badge= '<span>-</span>';
      }
      return badge;
    }

    getSystemStatus(status:string) {
      let badge='';
      if (status == 'ASSIGNED_TO_SELLER_DEALER'){
        badge= `<span class='badge  badge-pill badge-primary p-2'>Assigned To Seller / Dealer</span>`;
      }
      else if(status == 'PAYMENT_COMPLETED_BY_BUYER'){
        badge= `<span class='badge badge-pill badge-success p-2'>Payment Done By Buyer</span>`;
      }
      else if (status == 'REJECTED'){
        badge= `<span class='badge  badge-pill badge-danger  p-2'>Rejected</span>`;
      } else if (status == 'PAYMENT_REQUIRED_BY_BUYER') {
        badge= `<span class='badge  badge-pill badge-warning  p-2'>Payment required By Buyer</span>`;
      }
      else if(status == 'PROCESSING'){
        badge= `<span class='badge badge-pill badge-info p-2'>Processing</span>`;
      }
      else if (status == 'SHIPPED'){
        badge= `<span class='badge  badge-pill badge-success  p-2'>Completed</span>`;
      } 
      else if(status == 'DELIVERED'){
        badge= `<span class='badge badge-pill badge-dark p-2'>Delivered</span>`;
      }
      else if (status == 'REFUND_REQUESTED'){
        badge= `<span class='badge  badge-pill badge-danger  p-2'>Refund Requested</span>`;
      }
      else if (status == 'REFUND_PROCESSED'){
        badge= `<span class='badge  badge-pill badge-danger  p-2'>Refund Processed</span>`;
      } else {
        badge= '<span>-</span>';
      }
      return badge;
    }

    

}
