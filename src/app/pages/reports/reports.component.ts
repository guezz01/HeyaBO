import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { ReportsService } from '../../services/reports.service';
import { SingleReportComponent } from '../composition/single-report/single-report.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Chart, ChartType, registerables } from 'chart.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
