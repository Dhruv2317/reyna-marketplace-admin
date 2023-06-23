import { Injectable } from '@angular/core';

@Injectable()
export class TextEditorModalService {

  constructor() { }
  private formData:any;

  setFormData(data:any){
      this.formData = data;
  }

  getFormData(){
      return this.formData;
  }
}
