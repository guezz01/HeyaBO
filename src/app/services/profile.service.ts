import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  private baseUrl = "http://196.235.211.164:4000";

  constructor(private http: HttpClient,
    private _router: Router) { }


    getPosts(id:string,page:string,limit:string) {
      /* let headers = new HttpHeaders({
        'Content-Type': 'application/json'
     });
     let options = {
        headers: headers
     }; */
     let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
   });
     let _params = new HttpParams().set("page",page).set("limit", limit);
     
      return this.http.get<any>(this.baseUrl+"/posts/user/"+id, {headers: headers, params: _params});
    }

    getPostsById(id:string) {
      /* let headers = new HttpHeaders({
        'Content-Type': 'application/json'
     });
     let options = {
        headers: headers
     }; */
     let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
   });
     
      return this.http.get<any>(this.baseUrl+"/posts/user/"+id, {headers: headers});
    }

   


}
