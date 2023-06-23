import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CustomImageCropperService {
    constructor(private _http: HttpClient) {}
    private formData:any;

    setFormData(data:any){
        this.formData = data;
    }

    getFormData(){
        return this.formData;
    }

}
