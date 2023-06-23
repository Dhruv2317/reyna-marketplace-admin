import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class Toastr {
    options: any;
    constructor(private toastr: ToastrService) {
        this.options = {
            timeOut: 3000,
            closeButton: true,
            positionClass: "toast-top-right"
        };
    }

    showSuccess(message: string) {
        this.toastr.success(message, 'Success!', this.options);
    }

    showError(message: string) {
        this.toastr.error(message, 'Oops!', this.options);
    }

    showWarning(message: string) {
        this.toastr.warning(message, '', this.options);
    }

    showInfo(message: string) {
        this.toastr.info(message, '', this.options);
    }
}
