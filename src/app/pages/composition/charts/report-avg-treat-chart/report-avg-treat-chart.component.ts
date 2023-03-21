import { Component, OnInit } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-report-avg-treat-chart',
  templateUrl: './report-avg-treat-chart.component.html',
  styleUrls: ['./report-avg-treat-chart.component.css']
})
export class ReportAvgTreatChartComponent implements OnInit {

  single: any;

  constructor(public _authService: AuthService, private _reportService:ReportsService) { }

  ngOnInit(): void {

    Chart.register(...registerables);
    this.loadBarChartData();
  }


  loadBarChart(){
    const days = [];
    const averageTimeToTreatReport = [];
    for(let i=0;i<this.single.length;i++){
      days[i]=this.single[i]["date"];
      averageTimeToTreatReport[i]=this.single[i]["averageTimeTaken"];
    }
    days.reverse();
    averageTimeToTreatReport.reverse();
    const labels = days.slice(days.length - averageTimeToTreatReport.length);
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'average time to treat reports',
          data: averageTimeToTreatReport,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };
  
    const config = {
      type: 'bar' as ChartType,
      data: data,
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label;
                const month = days[context.dataIndex];
                const value = context.raw;
                return `${label}: ${value} (hours)`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: Math.max(...averageTimeToTreatReport) + (Math.max(...averageTimeToTreatReport) * 0.2)
          }
        }
      }
    };
  
    const myChart = new Chart('myBarChart', config);
  }
  
   loadBarChartData(){
    this._reportService.getAverageTimeToTreatAReport()
    .subscribe(
      data => {
        this.single= data;
        this.loadBarChart();
      },
      err => console.log(err)
    )
  }

}
