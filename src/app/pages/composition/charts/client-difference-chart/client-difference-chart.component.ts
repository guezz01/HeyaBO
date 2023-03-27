import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions, ChartType, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client-difference-chart',
  templateUrl: './client-difference-chart.component.html',
  styleUrls: ['./client-difference-chart.component.css']
})
export class ClientDifferenceChartComponent implements OnInit {


  pieChartData: any;

  public chartData: ChartData ;
  public chartOptions: ChartOptions ;
  adminCount : number;
  clientCount : number;
  professionalCount : number;

  constructor(public _authService: AuthService, private _userService:UserService) { }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.loadPieChartData();
  }

  loadPieChart(){
    const pieChart = document.getElementById('myPieChart') as HTMLCanvasElement;
  const ctxPieChart = pieChart.getContext('2d');
  this.chartData = {
    labels: ['Admins', 'Clients', 'Professionals'],
    datasets: [{
      data: [this.pieChartData[0]["count"], this.pieChartData[1]["count"], this.pieChartData[2]["count"]],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };
  this.chartOptions= {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}`;
          }
        }
      }
    }
  };

  const chart = new Chart(ctxPieChart, {
    type: 'pie' as ChartType,
    data: this.chartData,
    options: this.chartOptions
  });
  }

  loadPieChartData(){
    this._userService.getUserCountByRole()
    .subscribe(
      data => {
        this.pieChartData= data;
        
        
        this.loadPieChart();
      },
      err => console.log(err)
    )
  }

  treatData(){
    
  }

}
