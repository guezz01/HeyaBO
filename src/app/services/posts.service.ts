import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private baseUrl = "http://196.235.99.40:4000";

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

    getSinglePost(id:string) {
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
     
      return this.http.get<any>(this.baseUrl+"/posts/get/"+id, {headers: headers});
    }

    getPostComments(id:string,page:string = "1",limit:string = "10"){

      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     });
     let _params = new HttpParams().set("page",page).set("limit", limit);

     return this.http.get<any>(this.baseUrl+"/comments/"+id, {headers: headers, params: _params});
    }

    getPostsByAdmin(data: string, page: string, limit: string){

      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     });
     let _params = new HttpParams().set("page",page).set("limit", limit);
      const searchData = { data };
      return this.http.post<any>(this.baseUrl+"/posts/get/search/admin", searchData,{headers: headers, params: _params});
    }

    getClientAndProRegisterPostsCountByDay(){

      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     });

     return this.http.get<any>(this.baseUrl+"/posts/get/count/role", {headers: headers});
    }
    
    getPostCommentLikeCountsByDay(){

      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     });

     return this.http.get<any>(this.baseUrl+"/posts/get/interaction/day", {headers: headers});
    }

}
