import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';

import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/model/category';

@Component({
    templateUrl: './add-edit.component.html'
})
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    loading = false;   
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private CategoryService: CategoryService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.form = this.formBuilder.group({
            name: ['', [Validators.required,]],
            description: ['', [Validators.required,]],
            weight: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
        });

        if (!this.isAddMode) {
            this.CategoryService.get(this.id).subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        // this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createCategory();
        } else {
            this.updateCategory();
        }
    }

    private createCategory() {
        this.CategoryService.create(this.form.value).subscribe({
            next: () => {
                // this.alertService.success('User updated', { keepAfterRouteChange: true });
                console.log('Category created')
                this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: error => {
                console.log('Error creating category ', error);

                // this.alertService.error(error);
                this.loading = false;
            }
        });
    }

    private async updateCategory() {
        // need to retrieve the form data and remove the 'body' field
        // so the remaining data only has fields that the service can use
        const formData = this.form.value;
        delete formData['body'];
 
        const category = await this.CategoryService.get(this.id).toPromise();
        this.CategoryService.update(category, {body:this.form.value})
            .subscribe({
                next: () => {
                    // this.alertService.success('User updated', { keepAfterRouteChange: true });
                    console.log('Category Updated')
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    console.log('Error updating category ', error);

                    // this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}