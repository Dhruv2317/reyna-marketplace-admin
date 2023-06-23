import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-categories-view',
  templateUrl: './article-categories-view.component.html',
  styleUrls: ['./article-categories-view.component.scss']
})
export class ArticleCategoriesViewComponent implements OnInit {

  public categoryId: any;
  constructor(private route: ActivatedRoute){
      this.categoryId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
  }

}
