import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private baseUrl = "http://localhost:4000";

  constructor(private http: HttpClient,
    private _router: Router) { }

    getUserComments(id:string,page:string,limit:string) {
     let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
   });
     let _params = new HttpParams().set("page",page).set("limit", limit);
     
      return this.http.get<any>(this.baseUrl+"/comments/user/"+id, {headers: headers, params: _params});
    }
    getSearchByAdmin(data: string, page:string,limit:string) {
     let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
   });
     let _params = new HttpParams().set("page",page).set("limit", limit);
     const searchData = { data };
      return this.http.post<any>(this.baseUrl+"/comments/get/search/admin", searchData,{headers: headers, params: _params});
    }

    getCommentCountByDay() {
     let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
   });
     
      return this.http.get<any>(this.baseUrl+"/comments/get/count", {headers: headers});
    }

    getDistinctUsersPerDayForPastSevenDays() {
     let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
   });
     
      return this.http.get<any>(this.baseUrl+"/comments/get/distinc/users", {headers: headers});
    }

}
