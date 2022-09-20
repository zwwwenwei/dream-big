import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    user:any;
    isLoading = false;

    constructor(private userService: UserService, private router: Router, private authService: AuthService){
        
    }
    ngOnInit() {
      try{
        this.user = JSON.parse(this.userService.get.name);
     }catch(error){}
         
    }

    getUser() {
       
    }
    onLogOut() {
      this.isLoading = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000)
      localStorage.removeItem('loggedIn');
    }
}