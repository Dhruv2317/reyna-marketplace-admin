import { Component,OnInit,AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'admin-portal';

  constructor(private renderer: Renderer2){

  }

  ngOnInit(){

  }

  ngAfterViewInit(){
     let loader = this.renderer.selectRootElement('#loader');
     this.removeFadeOut(loader,1500);
  }

  removeFadeOut(el:any,speed:number){
    let that=this;
    var seconds = speed/1000;
    this.renderer.setStyle(el, 'transition',"opacity "+seconds+"s ease");
    this.renderer.setStyle(el, 'opacity', 0);
    setTimeout(function(){
      that.renderer.setStyle(el, 'display', 'none');
    },speed);
  }

}
