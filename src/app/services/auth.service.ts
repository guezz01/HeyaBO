import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginUrl = "https://heyya-dev.herokuapp.com/auth/login";

  constructor(private http: HttpClient,
              private _router: Router) { }


  loginUser(user:Login) {
    /* let headers = new HttpHeaders({
      'Content-Type': 'application/json'
   });
   let options = {
      headers: headers
   }; */
    return this.http.post<any>(this._loginUrl,user)
  }

  logoutUser() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('username')
    this._router.navigate(['/login'])
  }

  getToken() {
    return localStorage.getItem('accessToken')
  }

  loggedIn() {
    return localStorage.getItem('username')    
  }
}
