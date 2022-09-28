import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
     
  }
  Login() {
  console.log("you are logging in")
  this.authService.login(this.email, this.password)
  
   
  }
 
  ngOnInit() { }

//This is a temp solution and does not actually auth the user
  onSubmit() {
    this.isLoading = true;
    this.authService.login(this.email, this.password)
    }
      
}



