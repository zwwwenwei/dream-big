import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/model/category';

import { CategoryService } from 'src/app/services/category.service';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    categories: Category[] = [];

    constructor(
        private categoryService: CategoryService,
    ) { }

    ngOnInit() {
        this.categoryService.query().subscribe({
            next: (categories) => {
                this.categories = categories;
            }
        });
    }

    deleteCategory(id: number) {
        this.categoryService.delete(id).subscribe(() => { this.categories = this.categories.filter((u: Category) => u.id != id ) } );
    }
}