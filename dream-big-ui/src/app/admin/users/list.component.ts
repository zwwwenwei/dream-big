import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/model/user';

import { UserService } from 'src/app/services/user.service';

@Component({
    template: `
        <app-table [data]="users" title="Users" >

        <ng-template #headers>
            <th>Username</th>
            <th>Name</th>
            <th>Password</th>
            <th style="display: flex; justify-content: right;"><a routerLink="add" class="btn btn-success">Create</a></th>
        </ng-template>
        <ng-template #rows let-row>
            <td>{{ row.username }}</td>
            <td>{{row.name}}</td>
            <td>{{row.password}}</td>
            <th style="white-space: nowrap; display: flex; justify-content: right;">
                    <a routerLink="edit/{{row.id}}" class="btn btn-sm btn-primary mx-1">
                        <i class="fas fa-pen-to-square delete"></i>
                    </a>
                    <button (click)="deleteUser(row.id)" class="btn btn-sm btn-danger btn-delete-user" type="button">
                        <i class="fas fa-trash-alt delete"></i>
                    </button>
            </th>
        </ng-template>
        </app-table>
    `,
})
export class ListComponent implements OnInit {
    users: User[] = [];

    constructor(
        private userService: UserService,
    ) { }

    ngOnInit() {
        this.userService.query().subscribe({
            next: (users) => {
                this.users = users;
            }
        });
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.users = this.users.filter((u: User) => u.id != id) });
    }
}