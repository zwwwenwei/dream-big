import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

import { AuthGuard } from 'src/app/services/authguard.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = false;
  users: User[];


    constructor(private userService: UserService, private router: Router, private authService: AuthService){
        
    }
    ngOnInit() {
      this.loading = true;
      this.userService.query().pipe(first()).subscribe(users => {
          this.loading = false;
          this.users = users;
      });
    //   this.jouney.query().pipe(first()).subscribe(journey=> {
    //     this.loading = false;
    //     this.journey= journey;
    // });
  }

    onLogOut() {
      this.loading = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000)
      localStorage.removeItem('loggedIn');
    }
}