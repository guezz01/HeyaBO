import { Component, OnInit } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-report-open-close-chart',
  templateUrl: './report-open-close-chart.component.html',
  styleUrls: ['./report-open-close-chart.component.css']
})
export class ReportOpenCloseChartComponent implements OnInit {

  
  dates: Date[] = [];
  openedReportsData = [];
  closedReportsData = [];
  formattedDates: string[] = [];

  constructor(public _authService: AuthService, private _reportService:ReportsService) { }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.loadDates();
    this.loadReportData();
  }

  loadChartData(){
  
    const chartData = {
      datasets: [
        {
          label: 'Opened Reports',
          data: this.openedReportsData,
          borderColor: 'blue',
          fill: false,
        },
        {
          label: 'Closed Reports',
          data: this.closedReportsData,
          borderColor: 'red',
          borderWidth: 4,
          fill: false
        }
      ],
      labels: this.formattedDates
    };
    const maxValue = Math.max(...[...this.openedReportsData, ...this.closedReportsData]);
    const suggestedMax = maxValue + (maxValue * 0.2);
    const config = {
      type: 'line' as ChartType,
      data: chartData,
      options: {
        responsive: true,
        lineTension: 0.5,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label;
                const value = context.raw;
                return `${label}: ${value}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: suggestedMax
          }
        }
      }
    };
    const myChart = new Chart('myLineChart', config);
  }

  
  loadDates(){
    const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        this.dates.push(date);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        this.formattedDates.push(formattedDate);
      }
    
      console.log(this.formattedDates);
  }
  
  loadReportData() {
    this._reportService.getSubmittedReportCountByDay()
    .subscribe(
      data => {
        this.openedReportsData= data;
        this._reportService.getTreatedReportCountByDay()
        .subscribe(
          dater => {
            this.closedReportsData= dater;
            this.loadChartData();
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  
    
  }

}
