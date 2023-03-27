import { Component, OnInit } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-activity-chart',
  templateUrl: './activity-chart.component.html',
  styleUrls: ['./activity-chart.component.css']
})
export class ActivityChartComponent implements OnInit {

  result : any;
  dateData = [];
  resultData = [];
  userCount = [];
  countData: number ;

  constructor(public _authService: AuthService, private _userService:UserService) { }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.loadInteractionData();
  }

  loadChartData(){
    this.dateData.reverse();
    this.resultData.reverse();
    const chartData = {
      datasets: [
        {
          label: 'Last logged in Users',
          data: this.resultData,
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
                return `${label} count: ${value}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            display: true,
            suggestedMax: Math.max(...this.resultData) + (Math.max(...this.resultData) * 0.2)
          }
        }
      }
    };
    const myChart = new Chart('myActivityLineChart', config);
  }
  
 
  
  loadInteractionData() {
    this._userService.getUsersLastLogin()
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
    for (let [key, value] of Object.entries(this.result)) {
      // Push the key into the keys array and the value into the values array
      this.dateData.push(key);
      this.resultData.push(value);
    }

  }

}
