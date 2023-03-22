import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private baseUrl = "http://196.235.99.40:4000";

  constructor(private http: HttpClient,
    private _router: Router) { }

    private _listeners = new Subject<any>();

    getAllReports(page:string,limit:string) {
      /* let headers = new HttpHeaders({
        'Content-Type': 'application/json'
     });
     let options = {
        headers: headers
     }; */
     let headers = new HttpHeaders(); 
     headers.append('Content-Type', 'application/json');
     let _params = new HttpParams().set("page",page).set("limit", limit);
     
      return this.http.get<any>(this.baseUrl+"/report", {headers: headers, params: _params});
    }

    getReport(id:string) {
      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     });
     //console.log(this.baseUrl+"/get/"+id);
     return this.http.get<any>(`${this.baseUrl}/report/get/${id}`, { headers: headers });
      //return this.http.get(`${this.baseUrl}/get/${id}`);
    }

    getReportOfUser(id:string,page:string,limit:string) {
      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     });
     let _params = new HttpParams().set("page",page).set("limit", limit);
     //console.log(this.baseUrl+"/get/"+id);
     return this.http.patch<any>(this.baseUrl+"/report/accept/"+id,{ } ,{headers: headers, params: _params});

     //return this.http.get<any>(`${this.baseUrl}/report/get/${id}`, { headers: headers });
      //return this.http.get(`${this.baseUrl}/get/${id}`);
    }

    getUserReportByAdmin(id:string,page:string,limit:string){

      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     });
     let _params = new HttpParams().set("page",page).set("limit", limit);
     
      return this.http.get<any>(this.baseUrl+"/report/last/report/"+id, {headers: headers, params: _params});
    }

    acceptReport(id:string){
      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     });
     this.http.patch<any>(this.baseUrl+"/report/accept/"+id,{ } ,{headers: headers}).subscribe(
      (val) => {
          console.log("Report updated", 
                      val);
      },
      response => {
          console.log("An error occured", response);
      },
      () => {
          console.log("completed.");
      });
    }

    acceptReportAsync(id:string){
      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     });
     return this.http.patch<any>(this.baseUrl+"/report/accept/"+id,{ } ,{headers: headers});
    }

    closeReport(id:string){
      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     });
     return this.http.patch<any>(this.baseUrl+"/report/close/"+id,{ }, {headers: headers}).subscribe(
      (val) => {
          console.log("Report updated", 
                      val);
      },
      response => {
          console.log("An error occured", response);
      },
      () => {
          console.log("completed.");
      });
    }

    closeReportAsync(id:string){
      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     });
     return this.http.patch<any>(this.baseUrl+"/report/close/"+id,{ } ,{headers: headers});
    }

    listen(): Observable<any>{
      return this._listeners.asObservable();
    }
    filter(filterBy:string){
      this._listeners.next(filterBy);
    }

    getAverageTimeToTreatAReport(): Observable<any> {
      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     });
     return this.http.get<any>(this.baseUrl+"/report/average/treat/time", { headers: headers });
    }

    getSubmittedReportCountByDay(): Observable<any> {
      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     });
     return this.http.get<any>(this.baseUrl+"/report/submitted/by/day", { headers: headers });
    }

    getTreatedReportCountByDay(): Observable<any> {
      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     });
     return this.http.get<any>(this.baseUrl+"/report/treated/by/day", { headers: headers });
    }

    searchReportsByAdmin(data: string, role: string, page: string, limit: string): Observable<any> {
      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
     });
     let _params = new HttpParams().set("page",page).set("limit", limit);
      const searchData = { data, role};
      return this.http.post<any>(this.baseUrl+"/report/search/admin", searchData,{headers: headers, params: _params});
    }
}
