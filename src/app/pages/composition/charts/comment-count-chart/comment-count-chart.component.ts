import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';
import { Chart, ChartType, registerables } from 'chart.js';

@Component({
  selector: 'app-comment-count-chart',
  templateUrl: './comment-count-chart.component.html',
  styleUrls: ['./comment-count-chart.component.css']
})
export class CommentCountChartComponent implements OnInit {

  single: any;

  constructor(public _authService: AuthService, private _commentService:CommentsService) { }

  ngOnInit(): void {

    Chart.register(...registerables);
    this.loadBarChartData();
  }


  loadBarChart(){
    const days = [];
    const commentData = [];
    for(let i=0;i<this.single.length;i++){
      days[i]=this.single[i]["name"];
      commentData[i]=this.single[i]["value"];
    }
    console.log(commentData);
    const labels = days.slice(days.length - commentData.length);
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Comment count per day',
          data: commentData,
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
                const value = context.raw;
                return `${label}: ${value} comments`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: Math.max(...commentData) + (Math.max(...commentData) * 0.2)
          }
        }
      }
    };
  
    const myChart = new Chart('myBarChart', config);
  }
  
   loadBarChartData(){
    this._commentService.getCommentCountByDay()
    .subscribe(
      data => {
        this.single= data;
        this.loadBarChart();
      },
      err => console.log(err)
    )
  }

}
