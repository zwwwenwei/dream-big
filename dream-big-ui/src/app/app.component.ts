import { Component } from '@angular/core';
import { LoginComponent } from './Components/login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dream-big-ui';

  constructor(
    public authService : AuthService
) { }
  
logout()
{
  this.authService.logout();
}
  // authService = false;
  // login = false;
  // logout = true;
}
