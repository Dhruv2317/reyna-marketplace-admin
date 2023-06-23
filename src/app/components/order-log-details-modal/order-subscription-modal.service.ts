import { Injectable } from "@angular/core";

@Injectable()
export class OrderLogDetailsModalService {
    constructor() {}
    private formData:any;

    setFormData(data:any){
        this.formData = data;
    }

    getFormData(){
        return this.formData;
    }
}