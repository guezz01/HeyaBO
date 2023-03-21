import { Component, OnInit } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-count-role-chart',
  templateUrl: './post-count-role-chart.component.html',
  styleUrls: ['./post-count-role-chart.component.css']
})
export class PostCountRoleChartComponent implements OnInit {

  single: any;
  constructor(public _authService: AuthService, private _postService:PostsService) { }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.loadBarChartData();
  }

  loadBarChart(){
    const dates = [];
    const registeredProfessionalsData = [];
    const registeredClientsData = [];
    for(let i=0;i<this.single.length;i++){
      dates[i]=this.single[i]["name"];
      registeredProfessionalsData[i]=this.single[i]["value"][1];
      registeredClientsData[i]=this.single[i]["value"][0];
    }
    const maxValue = Math.max(...[...registeredProfessionalsData, ...registeredClientsData]);
    const suggestedMax = maxValue + (maxValue * 0.2);
    const labels = dates.slice(dates.length - registeredProfessionalsData.length);
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Posts made by clients',
          data: registeredClientsData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Posts made by professionals',
          data: registeredProfessionalsData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
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
                const month = dates[context.dataIndex];
                const value = context.raw;
                return `${label}: ${value}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax : suggestedMax
          }
        }
      }
    };

    const myChart = new Chart('myBarChart', config);
  }

  loadBarChartData(){
    this._postService.getClientAndProRegisterPostsCountByDay()
    .subscribe(
      data => {
        this.single= data;
        this.loadBarChart();
      },
      err => console.log(err)
    )
  }

}
