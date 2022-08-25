import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { StudentService } from 'src/app/services/student.service';

@Component({
    templateUrl: './add-edit.component.html'
})
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    loading = false;
    submitted = false;

    users!: User[];
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private studentService: StudentService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.form = this.formBuilder.group({
            name: ['', [Validators.required,]],
            address: ['', [Validators.required,]],
            user_id: ['', [Validators.required,]],
            phone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        });

        if (!this.isAddMode) {
            this.studentService.get(this.id).subscribe((x) => {
                this.form.patchValue(x);
                console.log(x);
            });
        }
        this.userService.query().subscribe({
            next: (users) => {
                this.users = users;
            }
        });
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
            this.create();
        } else {
            this.update();
        }
    }

    private create() {
        this.studentService.create(this.form.value).subscribe({
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

    private async update() {
        // need to retrieve the form data and remove the 'body' field
        // so the remaining data only has fields that the service can use
        const formData = this.form.value;
        delete formData['body'];

        const student = await this.studentService.get(this.id).toPromise();
        this.studentService.update(student, { body: this.form.value })
            .subscribe({
                next: () => {
                    // this.alertService.success('User updated', { keepAfterRouteChange: true });
                    console.log('Student Updated')
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    console.log('Error updating student ', error);

                    // this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}