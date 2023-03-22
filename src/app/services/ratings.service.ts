import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  private baseUrl = "http://196.235.99.40:4000";

  constructor(private http: HttpClient,
    private _router: Router) { }

    getUserRates(id:string,page:string,limit:string) {
     let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
   });
     let _params = new HttpParams().set("page",page).set("limit", limit);
     
      return this.http.get<any>(this.baseUrl+"/rating/user/rates/"+id, {headers: headers, params: _params});
    }

    getRatingCountByDay() {
      let headers = new HttpHeaders({ 
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    });
      
       return this.http.get<any>(this.baseUrl+"/rating/get/count", {headers: headers});
     }

     getTopRatedProfessionals() {
      let headers = new HttpHeaders({ 
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    });
      
       return this.http.get<any>(this.baseUrl+"/rating/top/rated", {headers: headers});
     }

     searchUserRatesByAdmin(data: string, page: string, limit: string){

      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     });
     let _params = new HttpParams().set("page",page).set("limit", limit);
      const searchData = { data };
      console.log(searchData);
      return this.http.post<any>(this.baseUrl+"/rating/get/search/admin", searchData,{headers: headers, params: _params});
    }

     getRatingById(id:string) {
      let headers = new HttpHeaders({ 
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    });
      
       return this.http.get<any>(this.baseUrl+"/rating/get/rating/"+id, {headers: headers});
     }

}
