import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category';

@Component({
  selector: 'app-root',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  title = 'dream-big-ui';
  category: Category[] = [];

  constructor(
    private categoryService: CategoryService
  ) {
    categoryService.query().subscribe({
      next: (category) => {
        this.category = category;
      }
    });

    const category = this.category[0];
    category.name = "somethiung";
    categoryService.update(category).subscribe({
      next: (category) => { console.log("success") },
      error: (message) => { console.log("error") }
    });
  }
}
