import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from '../models/login.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  restPasswordData=new ResetPassword("","");
  result:string;
  validateResult:string;
  errorMessage:string;
  email:string;
  token:string;

  constructor(private _userService: UserService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { 
              }

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.checkValidEmailToken(this.email,this.token);
    console.log(this.validateResult);
   
  }

  resetPassword (email) {
    console.log("this is it "+this.restPasswordData);
    this._userService.resetPassword(this.restPasswordData.password,this.restPasswordData.confirmPassword,email)
    .subscribe(
      res => {
        alert('Password changed successfully.');
        this.result = res;
      },
      err => console.log(err)
    ) 
  }

  checkValidEmailToken(email: string, token: string) {
    this._userService.getValidateResetPassword(token, email)
      .subscribe(
        res => {
          console.log(res);
          this.validateResult = res;
        },
        err => {
          console.log(err);
          this.errorMessage = err.error.message;
        }
      );
  }

}
