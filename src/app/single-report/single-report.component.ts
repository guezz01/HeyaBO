import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ReportsService } from '../services/reports.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-single-report',
  templateUrl: './single-report.component.html',
  styleUrls: ['./single-report.component.css']
})
export class SingleReportComponent implements OnInit {

  id:string;
  report:any;

  constructor(public _authService: AuthService, private _reportService:ReportsService, private route : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(paramsId => {
      this.id = paramsId.id;
      
  });

  this.loadReport(this.id);

  }

  loadReport(id){

    this._reportService.getReport(id)
    .subscribe(
      res => {
        this.report= res;
      },
      err => console.log(err)
    ) 

  }

  async acceptReport(){
    try{
    const val = await this._reportService.acceptReportAsync(this.id).toPromise();
    this.loadReport(this.id);
  }
  catch(error){
    console.log(error);
  }
    //this.redirectTo("/report/"+this.id);
    
  }

  closeReport(){
    this._reportService.closeReport(this.id);
    this.redirectTo("/report/"+this.id);
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

}
