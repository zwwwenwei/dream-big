import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';


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
        private userService: UserService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.form = this.formBuilder.group({
            username: ['', [Validators.required]],
            name: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });

        if (!this.isAddMode) {
            this.userService.get(this.id).subscribe(x => this.form.patchValue(x));
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
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        this.userService.create(this.form.value).subscribe({
            next: () => {
                // this.alertService.success('User updated', { keepAfterRouteChange: true });
                console.log('User created')
                this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: error => {
                console.log('Error creating user ', error);

                // this.alertService.error(error);
                this.loading = false;
            }
        });
    }

    private async updateUser() {
        // need to retrieve the form data and remove the 'body' field
        // so the remaining data only has fields that the service can use
        const formData = this.form.value;
        delete formData['body'];
 
        const user = await this.userService.get(this.id).toPromise();
        this.userService.update(user, {body:this.form.value}).subscribe({
                next: () => {
                    // this.alertService.success('User updated', { keepAfterRouteChange: true });
                    console.log('User Updated')
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    console.log('Error updating user ', error);

                    // this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}