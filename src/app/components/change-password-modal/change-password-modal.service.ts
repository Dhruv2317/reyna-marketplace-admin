import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordModalService {
  private formData:any;

  constructor() { }

  setFormData(data:any){
      this.formData = data;
  }

  getFormData(){
      return this.formData;
  }

  resetForm(reset:boolean){
      return reset;
  }
}
