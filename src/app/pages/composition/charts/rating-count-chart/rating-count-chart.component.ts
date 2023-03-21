import { Component, OnInit } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { RatingsService } from 'src/app/services/ratings.service';

@Component({
  selector: 'app-rating-count-chart',
  templateUrl: './rating-count-chart.component.html',
  styleUrls: ['./rating-count-chart.component.css']
})
export class RatingCountChartComponent implements OnInit {

  single: any;

  constructor(public _authService: AuthService, private _ratingService:RatingsService) { }

  ngOnInit(): void {

    Chart.register(...registerables);
    this.loadBarChartData();
  }


  loadBarChart(){
    const days = [];
    const ratingData = [];
    for(let i=0;i<this.single.length;i++){
      days[i]=this.single[i]["name"];
      ratingData[i]=this.single[i]["value"][0];
    }
    const labels = days.slice(days.length - ratingData.length);
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'rating count',
          data: ratingData,
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
                return `${label}: ${value} rates`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: Math.max(...ratingData) + (Math.max(...ratingData) * 0.2)
          }
        }
      }
    };
  
    const myChart = new Chart('myBarChart', config);
  }
  
   loadBarChartData(){
    this._ratingService.getRatingCountByDay()
    .subscribe(
      data => {
        this.single= data;
        this.loadBarChart();
      },
      err => console.log(err)
    )
  }


}
