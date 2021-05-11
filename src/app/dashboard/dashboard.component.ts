import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ReportsService } from '../services/reports.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  results:any;
  constructor(public _authService: AuthService, private _userService:UserService) { }

  ngOnInit(): void {

  }

}
