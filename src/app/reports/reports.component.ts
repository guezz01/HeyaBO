import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ReportsService } from '../services/reports.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reports:any;
  p: number;
  itemsPerPage = "5";
  totalItems: any;

  constructor(public _authService: AuthService, private _reportService:ReportsService) { }

  ngOnInit(): void {

    this._reportService.getAllReports("1","5")
    .subscribe(
      res => {
        this.reports= res;
        this.totalItems = res.meta.totalItems;
      },
      err => console.log(err)
    )

  }

  getPage(page) {
    
    this._reportService.getAllReports(page,this.itemsPerPage).subscribe((data: any) => {
      this.reports =  data;
      this.totalItems = data.meta.totalItems;

    })
  }

}
