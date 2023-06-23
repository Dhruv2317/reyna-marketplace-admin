import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsletterTemplatePreviewService {
  templatePreview: any = {};

  constructor(private _http: HttpClient) {}

  setData(data: any){
    this.templatePreview = data;
  }

  getData(){
    return this.templatePreview;
  }
}
