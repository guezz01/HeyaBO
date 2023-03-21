import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(public _authService: AuthService, private _reportService:ReportsService, private matDialog:MatDialog, private router: Router) { }

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

  openPopUp(id){

    this.matDialog.open(SingleReportComponent,{ width:'60%', height:'420px', closeOnNavigation: true,
    data:{
      id:id
    }
  });
  }




  searchReportsByAdmin(page){
    if(this.selectedRole){
      console.log("role "+this.selectedRole)
      this.role = this.selectedRole === "pending" ? "1" : "2"
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

}
