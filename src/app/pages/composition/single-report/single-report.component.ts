import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ReportsService } from '../../../services/reports.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-single-report',
  templateUrl: './single-report.component.html',
  styleUrls: ['./single-report.component.css']
})
export class SingleReportComponent implements OnInit {

  id:string;
  report:any;

  constructor(public _authService: AuthService, private _reportService:ReportsService,
     private route : ActivatedRoute, private router: Router, @Inject(MAT_DIALOG_DATA) public data, public dialog:MatDialog) {

      

   }

  ngOnInit(): void {

    
    this.id = this.data.id;
    console.log("id = "+this.id);
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
    this.dialog.closeAll();
    this._reportService.filter("closed");
  }

  async closeReport(){

    try{
      const val = await this._reportService.closeReportAsync(this.id).toPromise();
      //this.loadReport(this.id);
    }
    catch(error){
      console.log(error);
    }
    this.dialog.closeAll();
    this._reportService.filter("closed");
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

}
