import { Component, OnInit } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment-user-activity-chart',
  templateUrl: './comment-user-activity-chart.component.html',
  styleUrls: ['./comment-user-activity-chart.component.css']
})
export class CommentUserActivityChartComponent implements OnInit {

  dates: Date[] = [];
  result : any;
  dateData = [];
  userCount = [];
  countData: number ;

  constructor(public _authService: AuthService, private _commentService:CommentsService) { }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.loadInteractionData();
  }

  loadChartData(){
    
    const countData = this.result.map(professional => professional.count);
    const chartData = {
      datasets: [
        {
          label: 'distinct user commenting per day',
          data: this.userCount,
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          borderColor: 'rgba(255, 0, 0, 1)',
          fill: true
        }
      ],
      labels: this.dateData
    };
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
            display: true,
            suggestedMax: Math.max(...countData) + (Math.max(...countData) * 0.2)
          }
        }
      }
    };
    const myChart = new Chart('myLineChart', config);
  }
  
 
  
  loadInteractionData() {
    this._commentService.getDistinctUsersPerDayForPastSevenDays()
    .subscribe(
      data => {
        this.result= data;
        this.countData = this.result.length;
        this.treatData();
        this.loadChartData();
      },
      err => console.log(err)
    )
  }

  treatData(){
    for(let i=0; i< this.result.length;i++){
      this.userCount[i] = this.result[i]["count"];
      this.dateData[i]=this.result[i]["date"];
    }

  }


}
