import { Component, OnInit } from '@angular/core';
import { Chart, ChartType, registerables, Element } from 'chart.js';
import { RatingsService } from 'src/app/services/ratings.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rating-top-pro-chart',
  templateUrl: './rating-top-pro-chart.component.html',
  styleUrls: ['./rating-top-pro-chart.component.css']
})
export class RatingTopProChartComponent implements OnInit {

  single: any;

  constructor(private _ratingService:RatingsService, private router: Router) { }

  ngOnInit(): void {

    Chart.register(...registerables);
    this.loadBarChartData();
  }


  async loadBarChart() {
    const ratingData = [];
    const avatarArray = [];
    const canvas = document.getElementById('ratingChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const ids = this.single.map(professional => professional.id);
    const labels = this.single.map(professional => professional.username);
    const countData = this.single.map(professional => professional.count);
    const avatarUrls = await this.single.map(professional => professional.avatar);
    console.log(avatarUrls);
    for(let i = 0; i< avatarUrls.length; i++){
      const img = new Image();
      img.src = avatarUrls[i];
      avatarArray.push(img);
    }
    
    const data = {
      labels: labels,
      datasets: [{
        label: 'professional rating count',
        data: countData,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };
  
    const avatarPlugin = {
      id: 'avatarPlugin',
      afterDatasetDraw: (chart, args, options)=> {
        const {ctx, chartArea:{top,bottom,left,right,wdth,height},
          scales: {x,y}} = chart;
        ctx.save();
    
        for(let i = 0; i< avatarUrls.length; i++){
          const url = avatarUrls[i];
          const index = avatarArray.findIndex(img => img.src === url);
          if(index !== -1){
            const img = avatarArray[index]
            ctx.save();
            ctx.beginPath();
            ctx.arc(x.getPixelForValue(i), y.getPixelForValue(countData[i]) -24, 20, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(img, x.getPixelForValue(i)-20, y.getPixelForValue(countData[i])-44, 40, 40); 
            ctx.restore();
            console.log(this);
            // add event listener to the avatar image
            canvas.addEventListener('click', (event) => {
              const bounds = canvas.getBoundingClientRect();
              const xPosition = event.clientX - bounds.left;
              const yPosition = event.clientY - bounds.top;
    
              // check if the click event is inside the avatar image
              if (xPosition > x.getPixelForValue(i) - 20 &&
                  xPosition < x.getPixelForValue(i) + 20 &&
                  yPosition > y.getPixelForValue(countData[i]) - 44 &&
                  yPosition < y.getPixelForValue(countData[i]) - 4) {
                    this.redirectTo('/profile/'+ids[index]);
              }
            });
          }
        }        
      }
    }
    
    
    
    const config = {
      type: 'bar' as ChartType,
      data,
      options: {
        scales: {
          y: {
            display: false,
            suggestedMax: Math.max(...countData) + (Math.max(...countData) * 0.3)
          }
        },
      },
      plugins:[avatarPlugin]
    };
    
  
    const myChart = new Chart(ctx, config);
    //this.drawImage(myChart, avatarUrls, ctx);
    
  }

  public redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

 loadBarChartData(){
  this._ratingService.getTopRatedProfessionals()
  .subscribe(
    data => {
      data.sort((a, b) => a.count - b.count);
      this.single= data;

      this.loadBarChart();
    },
    err => console.log(err)
  )
}
 
  
}
  /*loadBarChart() {
    const canvas = document.getElementById('ratingChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const labels = this.single.map(professional => professional.username);
    const countData = this.single.map(professional => professional.count);
    const avatarUrls = this.single.map(professional => professional.avatar);
    const avatarImages = [];
    for (let i = 0; i < avatarUrls.length; i++) {
      const img = new Image();
      img.src = avatarUrls[i];
      avatarImages.push(img);
    }
    
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'professional rating count',
          data: countData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'avatar images',
          data: avatarImages,
          
          borderWidth: 0,
          hoverBorderWidth: 0
        }
      ]
    };
  
    const config = {
      type: 'bar' as ChartType,
      data: data,
      options: {
        scales: {
          y: {
            display: false,
            suggestedMax: Math.max(...countData) + (Math.max(...countData) * 0.2)
          }
        },
        plugins: {
          datalabels: {
            font: {
              size: 0 // set font size to 0 to hide the default labels
            }
          }
        }
      }
    };
  
    const myChart = new Chart(ctx, config);
  }*/


  /*drawImage(myChart:Chart, avatarUrls:any, ctx:any){
    for (let i = 0; i < this.single.length; i++) {
      const img = new Image();
      img.src = avatarUrls[i];
      const x = myChart.getDatasetMeta(0).data[i].x;
      const y = myChart.getDatasetMeta(0).data[i].y;
      const imgWidth = 50;
      const imgHeight = 50;
      const xPos = x - (imgWidth / 2);
      const yPos = y - imgHeight - 5;
      img.onload = () => {
        ctx.drawImage(img, xPos, yPos, imgWidth, imgHeight);
      }
    }
  }*/


  


/* loadBarChart(){
    const ratingData = [];
    
    const labels = this.single.map(professional => `<img src="${professional.avatar}" alt="${professional.username}" height="50">${professional.username}<br>Count: ${professional.count}`);
    const countData = this.single.map(professional => professional.count);
    const data = {
      labels: labels,
      datasets: [{
          label: 'professional rating count',
          data: countData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
      }]
  };
  
    const config = {
      type: 'bar' as ChartType,
      data: data,
      options: {
        scales: {
            x: {
                ticks: {
                    callback: (value, index) => {
                        return labels[index];
                    }
                }
            },
            y: {
                display: false
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const count = countData[context.dataIndex];
                        return `Count: ${count}`;
                    }
                }
            }
        }
    }
    
    };
  
    const myChart = new Chart('ratingChart', config);
  }*/
  

/*const config = {
      type: 'bar' as ChartType,
      data: data,
      options: {
        scales: {
          x: {
            ticks: {
              callback: (value, index) => {
                return labels[index];
              }
            }
          },
          y: {
            display: false,
            suggestedMax: Math.max(...countData) + (Math.max(...countData) * 0.2)
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const professional = this.single[context.dataIndex];
                return `Count: ${professional.count}`;
              },
              
            }
          }
        }
      }
    };
    */
   /*const ratingChart = {
    id: 'ratingChart',
    afterDatasetDraw(chart,args,options){
      const {ctx, chartArea:{top,bottom,left,right,wdth,height},
      scales: {x,y}} = chart;
    ctx.save();

    for(let i = 0; i< avatarUrls.length; i++){
      ctx.drawImage(avatarUrls[i],x.getPixelForValue(i)-(40/2),
      y.getPixelForValue(countData[i])-40,40,40);
    }
    }
   }*/


   /*const avatarPlugin = {
    id: 'avatarPlugin',
    afterDatasetDraw: function(chart, args, options) {
      const {ctx, chartArea:{top,bottom,left,right,wdth,height},
        scales: {x,y}} = chart;
      ctx.save();
  
      for(let i = 0; i< avatarArray.length; i++){
        const xCoord = x.getPixelForValue(i) - 20;
        console.log(xCoord);
        const yCoord = y.getPixelForValue(countData[i]) - 40;
        ctx.beginPath();
        ctx.arc(xCoord + 20, yCoord + 20, 20, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatarArray[i], xCoord, yCoord, 40, 40);
        console.log("draw image");
      }
        ctx.restore();
      }
  }*/

  /*async loadBarChart() {
    const ratingData = [];
    const avatarArray = [];
    const canvas = document.getElementById('ratingChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const labels = this.single.map(professional => professional.username);
    const countData = this.single.map(professional => professional.count);
    const avatarUrls = await this.single.map(professional => professional.avatar);
    console.log(avatarUrls);
    for(let i = 0; i< avatarUrls.length; i++){
      const img = new Image();
      img.src = avatarUrls[i];
      avatarArray.push(img);
    }
    
    const data = {
      labels: labels,
      datasets: [{
        label: 'professional rating count',
        data: countData,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };
  
    const avatarPlugin = {
      id: 'avatarPlugin',
      afterDatasetDraw: function(chart, args, options) {
        const {ctx, chartArea:{top,bottom,left,right,wdth,height},
          scales: {x,y}} = chart;
        ctx.save();
    
        for(let i = 0; i< avatarArray.length; i++){
          ctx.drawImage(avatarArray[i],x.getPixelForValue(i)-(40/2),
            y.getPixelForValue(countData[i])-45,40,40);
        }
        ctx.restore();
      }
    }
    
    const config = {
      type: 'bar' as ChartType,
      data,
      options: {
        scales: {
          y: {
            display: false,
            suggestedMax: Math.max(...countData) + (Math.max(...countData) * 0.3)
          }
        },
      },
      plugins:[avatarPlugin]
    };
    
  
    const myChart = new Chart(ctx, config);
    //this.drawImage(myChart, avatarUrls, ctx);
  }*/

  /*const avatarPlugin = {
    id: 'avatarPlugin',
    afterDatasetDraw: function(chart, args, options) {
      const {ctx, chartArea:{top,bottom,left,right,wdth,height},
        scales: {x,y}} = chart;
      ctx.save();
  
      for(let i = 0; i< avatarUrls.length; i++){
        const url = avatarUrls[i];
        const index = avatarArray.findIndex(img => img.src === url);
        if(index !== -1){
          const img = avatarArray[index];
          ctx.save();
          ctx.beginPath();
          ctx.arc(x.getPixelForValue(i), y.getPixelForValue(countData[i]) -29, 25, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, x.getPixelForValue(i)-25, y.getPixelForValue(countData[i])-54, 50, 50);
          ctx.restore();
        }
      }        
    }
  }*/