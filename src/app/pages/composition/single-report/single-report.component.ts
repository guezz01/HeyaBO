import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ReportsService } from '../../../services/reports.service';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-single-report',
  templateUrl: './single-report.component.html',
  styleUrls: ['./single-report.component.css']
})
export class SingleReportComponent implements OnInit {

  id:string;
  report:any;
  adminComment:string;
  //updateData = new EventEmitter<any>();

  constructor(public _authService: AuthService, private _reportService:ReportsService,
     private route : ActivatedRoute, private router: Router, @Inject(MAT_DIALOG_DATA) public data, public dialog:MatDialog,
     public dialogRef: MatDialogRef<SingleReportComponent>) {
   }

   
  doAction(){
    this.dialogRef.close({data:this.report});
  }

  ngOnInit(): void {

    
    this.id = this.data.id;
    this.report = this.data;
  //this.loadReport(this.id);

  }

  updateInTreatementReport(){
    console.log(this.adminComment);
    console.log("report id after = "+this.data.id);
    this._reportService.finishReport(this.report.id, this.adminComment)
    .subscribe(
      res => {
        this.report.status = 2;
        console.log( this.report);
        this.report.treatedReport.content = this.adminComment;
        console.log("after treat");
        console.log(this.adminComment);
        //this.doAction();
      },
      err => console.log(err)
    ) 

  }

  async acceptReport(){
    try{
    this._reportService.acceptReportAsync(this.report.id).subscribe(
      res => {
        this.report.status = 4;
        this.report.treatedReport = res.treatedReport;
        //this.doAction();
      },
      err => console.log(err)
    );

    //this.loadReport(this.id);
  }
  catch(error){
    console.log(error);
  }
    //this.redirectTo("/report/"+this.id);
    //this.dialog.closeAll();
    //this._reportService.filter("closed");
  }

  async closeReport(content: string){

    try{
      const val = await this._reportService.closeReportAsync(this.id,"closed by admin because case was treated previously and actions have been taken").toPromise();
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
