import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "https://heyya-dev.herokuapp.com/Users";

  constructor(private http: HttpClient,
    private _router: Router) { }


    getUsers(page:string,limit:string) {
      /* let headers = new HttpHeaders({
        'Content-Type': 'application/json'
     });
     let options = {
        headers: headers
     }; */
     let headers = new HttpHeaders();
     headers.append('Content-Type', 'application/json');
     let _params = new HttpParams().set("page",page).set("limit", limit);
     
      return this.http.get<any>(this.baseUrl, {headers: headers, params: _params});
    }

  
    getUser(id:string) {
      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     });
     console.log(this.baseUrl+"/get/"+id);
     return this.http.get<any>(`${this.baseUrl}/get/${id}`, { headers: headers });
      //return this.http.get(`${this.baseUrl}/get/${id}`);
    }

    getUserByRole(role:string,page:string,limit:string) {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      let _params = new HttpParams().set("role",role).set("page",page).set("limit", limit);
      
       return this.http.get<any>(this.baseUrl+"/role", {headers: headers, params: _params});
    }
  
    create(data): Observable<any> {
      return this.http.post(this.baseUrl, data);
    }
  //needs new api
    update(id, data): Observable<any> {
      return this.http.put(`${this.baseUrl}/${id}`, data);
    }
  
    delete(id): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }
  
    deleteAll(): Observable<any> {
      return this.http.delete(this.baseUrl);
    }
  
    findByTitle(title): Observable<any> {
      return this.http.get(`${this.baseUrl}?title=${title}`);
    }







   /* getUser(id:string) {
       
     let headers = new HttpHeaders();
     headers.append('Content-Type', 'application/json');
     //let _params = new HttpParams().set("id",id);
     
      return this.http.get<any>(this._userUrl+"/get/"+id, {headers: headers});
    }
*/


}
