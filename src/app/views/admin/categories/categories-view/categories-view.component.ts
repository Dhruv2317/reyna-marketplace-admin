import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-view',
  templateUrl: './categories-view.component.html',
  styleUrls: ['./categories-view.component.scss']
})
export class CategoriesViewComponent implements OnInit {

  public categoryId: any;
  constructor(private route: ActivatedRoute){
      this.categoryId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
  }

}
