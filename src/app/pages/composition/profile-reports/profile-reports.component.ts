import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ReportsService } from '../../../services/reports.service';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { SingleReportComponent } from '../single-report/single-report.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-profile-reports',
  templateUrl: './profile-reports.component.html',
  styleUrls: ['./profile-reports.component.css']
})
export class ProfileReportsComponent implements OnInit {

  id:any;
  reports:any;
  p: number;
  itemsPerPage = "3";
  totalItems: any;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  constructor(public _authService: AuthService,
    private _reportsService: ReportsService,
    private route: ActivatedRoute,
    private matDialog:MatDialog) { 
      this._reportsService.listen().subscribe((event:any)=>{
        console.log(event);
        this.refreshData();
      })
    }

  ngOnInit(): void {
    this.route.params.subscribe((paramsId) => {
      this.id = paramsId.id;
    });
   

    this.refreshData();
  }

  getPage(p) {
    
    this._reportsService.getUserReportByAdmin(this.id,p,this.itemsPerPage).subscribe((data: any) => {
      this.reports =  data;
      this.totalItems = data.meta.totalItems;

    })
  }

  openPopUp(report){

    const dialogRef = this.matDialog.open(SingleReportComponent,{ width:'60%', height:'550px', closeOnNavigation: true,
    data:report
  });

  dialogRef.afterClosed().subscribe(result => {
      this.updateRowData(result.data);
  });
  }

  refreshData(){
    this._reportsService.getUserReportByAdmin(this.id,'1','3')
    .subscribe(
      (nes : any) => {
        this.reports= nes;
        this.totalItems = nes.meta.totalItems;
      },
      err => console.log(err)
    );
  }

  updateRowData(row_obj){
    this.reports = this.reports.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.status = row_obj.status;
      }
      return true;
    });
  }

}
