import { Component, OnInit } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-client-chart',
  templateUrl: './new-client-chart.component.html',
  styleUrls: ['./new-client-chart.component.css']
})
export class NewClientChartComponent implements OnInit {

  
  single: any;
  constructor(public _authService: AuthService, private _userService:UserService) { }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.loadBarChartData();
  }

  loadBarChart(){
    const days = [];
    const registeredProfessionalsData = [];
    const registeredClientsData = [];
    for(let i=0;i<this.single.length;i++){
      days[i]=this.single[i]["date"];
      registeredProfessionalsData[i]=this.single[i]["count"][1];
      registeredClientsData[i]=this.single[i]["count"][0];
    }
    const maxValue = Math.max(...[...registeredProfessionalsData, ...registeredClientsData]);
    const suggestedMax = maxValue + (maxValue * 0.2);

    const labels = days.slice(days.length - registeredProfessionalsData.length);
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'New registered clients',
          data: registeredClientsData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'New registered professionals',
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
                const month = days[context.dataIndex];
                const value = context.raw;
                return `${label}: ${value} (${month})`;
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
    this._userService.getClientAndProRegisterCountByDay()
    .subscribe(
      data => {
        this.single= data;
        this.loadBarChart();
      },
      err => console.log(err)
    )
  }

}
