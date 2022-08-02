import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';

import { UnitService } from 'src/app/services/unit.service';
import { Unit } from 'src/app/model/unit';

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
        private unitService: UnitService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.form = this.formBuilder.group({
            code: ['', [Validators.required,]],
            name: ['', [Validators.required,]],
            description: ['', [Validators.required,]],
        });

        if (!this.isAddMode) {
            this.unitService.get(this.id).subscribe(x => this.form.patchValue(x));
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
            this.createUnit();
        } else {
            this.updateUnit();
        }
    }

    private createUnit() {
        this.unitService.create(this.form.value).subscribe({
            next: () => {
                // this.alertService.success('User updated', { keepAfterRouteChange: true });
                console.log('Unit created')
                this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: error => {
                console.log('Error creating unit ', error);

                // this.alertService.error(error);
                this.loading = false;
            }
        });
    }

    private async updateUnit() {
        // need to retrieve the form data and remove the 'body' field
        // so the remaining data only has fields that the service can use
        const formData = this.form.value;
        delete formData['body'];
 
        const unit = await this.unitService.get(this.id).toPromise();
        this.unitService.update(unit, {body:this.form.value})
            .subscribe({
                next: () => {
                    // this.alertService.success('User updated', { keepAfterRouteChange: true });
                    console.log('Unit Updated')
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    console.log('Error updating unit ', error);

                    // this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}