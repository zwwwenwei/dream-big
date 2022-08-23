import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/model/user';

import { UserService } from 'src/app/services/user.service';

@Component({ templateUrl: 'list.component.html' })
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
        this.userService.delete(id).subscribe(() => { this.users = this.users.filter((u: User) => u.id != id ) } );
    }
}