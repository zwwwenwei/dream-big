import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/model/student';
import { StudentJourneyService } from 'src/app/services/student-journey.service';

@Component({
    templateUrl: './add-edit.component.html'
})
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    loading = false;
    submitted = false;

    students!: Student[];
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private studentService: StudentService,
        private studentJourneyService: StudentJourneyService,
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.form = this.formBuilder.group({
            timeline: ['', [Validators.required,]],
            student_id: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        });

        if (!this.isAddMode) {
            this.studentJourneyService.get(this.id).subscribe((x) => {
                this.form.patchValue(x);
            });
        }

        this.studentService.query().subscribe({
            next: (students) => {
                this.students = students;
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
        this.studentJourneyService.create(this.form.value).subscribe({
            next: () => {
                // this.alertService.success('User updated', { keepAfterRouteChange: true });
                console.log('student journey created')
                this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: error => {
                console.log('Error creating student journey ', error);

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

        const journey = await this.studentJourneyService.get(this.id).toPromise();
        this.studentJourneyService.update(journey, { body: this.form.value })
            .subscribe({
                next: () => {
                    // this.alertService.success('User updated', { keepAfterRouteChange: true });
                    console.log('Student Journey Updated')
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    console.log('Error updating student journey', error);

                    // this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}