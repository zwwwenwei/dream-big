import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/model/category';

import { CategoryService } from 'src/app/services/category.service';

@Component({
    // templateUrl: 'list.component.html' ,
    template: `
    <app-table [data]="categories" title="Categories" >

      <ng-template #headers>
        <th>Name</th>
        <th>Description</th>
        <th>Weight</th>
        <th style="display: flex; justify-content: right;"><a routerLink="add" class="btn btn-success">Create</a></th>
      </ng-template>
      <ng-template #rows let-row>
        <td>{{ row.name }}</td>
        <td>{{row.description}}</td>
        <td>{{row.weight}}</td>
        <th style="white-space: nowrap; display: flex; justify-content: right;">
                <a routerLink="edit/{{row.id}}" class="btn btn-sm btn-primary mx-1">
                    <i class="fas fa-pen-to-square delete"></i>
                </a>
                <button (click)="deleteCategory(row.id)" class="btn btn-sm btn-danger btn-delete-user" type="button">
                    <i class="fas fa-trash-alt delete"></i>
                </button>
        </th>
      </ng-template>
    </app-table>
  `,
})
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
        this.categoryService.delete(id).subscribe(() => { this.categories = this.categories.filter((u: Category) => u.id != id) });
    }
}