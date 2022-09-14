import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
 
export class AuthService {
 
  uri = 'http://localhost:3000';
  token: any;
 
  constructor(private http: HttpClient,private router: Router) { }
  login(email: string, password: string) {
    this.http.post(this.uri + '/auth/login', {email: email,password: password})
    .subscribe((resp: any) => {
     
      this.router.navigate(['profile']);
      localStorage.setItem('auth_token', resp.token);
      
      });
       
    }
    logout() {
      localStorage.removeItem('token');
    }
   
    public get logIn(): boolean {
      return (localStorage.getItem('token') !== null);
    }
 
}

