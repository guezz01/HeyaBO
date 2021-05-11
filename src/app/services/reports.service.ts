import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private baseUrl = "https://heyya-dev.herokuapp.com";

  constructor(private http: HttpClient,
    private _router: Router) { }


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

    getUserReportByAdmin(id:string,limit:string){

      let headers = new HttpHeaders(); 
     headers.append('Content-Type', 'application/json');
     let _params = new HttpParams().set("limit", limit);
     
      return this.http.get<any>(this.baseUrl+"/report/last/reported/"+id, {headers: headers, params: _params});
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
}
