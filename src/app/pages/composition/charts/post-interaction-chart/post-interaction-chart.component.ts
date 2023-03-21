import { Component, OnInit } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-interaction-chart',
  templateUrl: './post-interaction-chart.component.html',
  styleUrls: ['./post-interaction-chart.component.css']
})
export class PostInteractionChartComponent implements OnInit {

  
  dates: Date[] = [];
  result : any;
  dateData = [];
  commentData = [];
  likeData = [];
  maxLikeValue : any;
  maxCommentValue: any;

  constructor(public _authService: AuthService, private _postService:PostsService) { }

  ngOnInit(): void {
    this.maxLikeValue=0;
    this.maxCommentValue=0;
    Chart.register(...registerables);
    this.loadInteractionData();
  }

  loadChartData(){
    const maxValue = this.maxLikeValue < this.maxCommentValue ? this.maxCommentValue : this.maxLikeValue;
    const chartData = {
      datasets: [
        {
          label: 'Average Like per post',
          data: this.likeData,
          borderColor: 'blue',
          fill: false,
        },
        {
          label: 'Average comment per post',
          data: this.commentData,
          borderColor: 'red',
          fill: false
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
            suggestedMax: maxValue + maxValue * 0.2
          }
        }
      }
    };
    const myChart = new Chart('myLineChart', config);
  }
  
 
  
  loadInteractionData() {
    this._postService.getPostCommentLikeCountsByDay()
    .subscribe(
      data => {
        this.result= data;
        this.treatData();
        this.loadChartData();
      },
      err => console.log(err)
    )
  }

  treatData(){
    for(let i=0; i< this.result.length;i++){
      if(this.result[i]["postCount"]==0){
        this.result[i]["postCount"] = 1;
      }
      this.likeData[i] = this.result[i]["likeCount"] / this.result[i]["postCount"]
      if(this.maxLikeValue<this.likeData[i]){this.maxLikeValue = this.likeData[i]}
      this.commentData[i] = this.result[i]["commentCount"] / this.result[i]["postCount"]
      if(this.maxCommentValue<this.commentData[i]){this.maxCommentValue = this.commentData[i]}
      this.dateData[i]=this.result[i]["date"];
    }
    console.log(this.likeData);
    console.log(this.commentData);
  }

}
