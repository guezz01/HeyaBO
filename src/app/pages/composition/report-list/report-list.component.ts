import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ReportsService } from 'src/app/services/reports.service';
import { SingleReportComponent } from '../single-report/single-report.component';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  reports:any;
  p: number;
  itemsPerPage = "5";
  totalItems: any;
  selectedRole: string;
  searchTerm: string;
  role:string;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  constructor(public _authService: AuthService, private _reportService:ReportsService, private matDialog:MatDialog, private router: Router) { }

  
  updateRowData(row_obj){
    this.reports = this.reports.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.status = row_obj.status;
      }
      return true;
    });
  }
  
  ngOnInit(): void {

    this._reportService.searchReportsByAdmin("","","1",this.itemsPerPage)
    .subscribe(
      res => {
        this.reports= res;
        this.totalItems = res.meta.totalItems;
      },
      err => console.log(err)
    )

  }

  openPopUp(report){

    const dialogRef = this.matDialog.open(SingleReportComponent,{ width:'60%', height:'550px', closeOnNavigation: true,
    data:report
  });

  dialogRef.afterClosed().subscribe(result => {
      this.updateRowData(result.data);
  });
  }

  searchReportsByAdmin(page){
    if(this.selectedRole){
      console.log("role "+this.selectedRole)
      this.role = this.selectedRole === "pending" ? "1" : this.selectedRole === "inTreatement" ? "4" : "2"
    }
    this._reportService.searchReportsByAdmin(this.searchTerm,this.role,page,this.itemsPerPage).subscribe((data: any) => {
      this.reports =  data;
      this.totalItems = data.meta.totalItems;
      console.log(this.reports);
    })
  }

  resetFilters(){
    this.selectedRole=null;
    this.role=null;
    this.searchTerm=null;
    this._reportService.searchReportsByAdmin("","","1",this.itemsPerPage)
    .subscribe(
      res => {
        this.reports= res;
        this.totalItems = res.meta.totalItems;
      },
      err => console.log(err)
    )
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

 updateReport(report) {
  const index = this.reports.findIndex(r => r.id === report.id);
  if (index >= 0) {
    this.reports[index] = report;
  }
}

}
