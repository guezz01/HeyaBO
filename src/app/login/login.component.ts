import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Login } from '../models/login.model';

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
        localStorage.setItem('username', JSON.stringify(res.username))
        localStorage.setItem('accessToken', res.accessToken)
        this._router.navigate(['/dashboard'])
      },
      err => console.log(err)
    ) 
  }

}
