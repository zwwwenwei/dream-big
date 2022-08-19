import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category';

@Component({
  selector: 'app-categorys',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  title = 'dream-big-ui';
  categorys: Category[] = [];

  constructor(
    private categoryService: CategoryService
  ) {
    this.categoryService.query().subscribe({
      next: (categorys) => {
        this.categorys = categorys;
      }
    });

    // const category = this.category[0];
    // category.name = "somethiung";
    // categoryService.update(category).subscribe({
    //   next: (category) => { console.log("success") },
    //   error: (message) => { console.log("error") }
    // });
  }

  public addCategory(categoryName: string, description: string, weight: number) {
    const data = {
      categoryName,
      description,
      weight
    }

    this.categoryService.create(data).subscribe(
      (category: Category) => {
        this.categorys.push(category);
      }
    );
  }
}
