import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData=new Login("","");

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  loginUser () {
    console.log("this is it "+this.loginUserData);
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        if(res.role!=1){
          this._router.navigate(['/login']);
        }
        else{
          localStorage.setItem('id', res.id);
          localStorage.setItem('username', JSON.stringify(res.username));
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('avatar', res.avatar);
          localStorage.setItem('role', res.role);
          this._router.navigate(['/dashboard']);
        }
        
      },
      err => console.log(err)
    ) 
  }

}
