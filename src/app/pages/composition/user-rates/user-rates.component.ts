import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RatingsService } from '../../../services/ratings.service';

@Component({
  selector: 'app-user-rates',
  templateUrl: './user-rates.component.html',
  styleUrls: ['./user-rates.component.css']
})
export class UserRatesComponent implements OnInit {

  id:any;
  rates:any;
  p: number;
  itemsPerPage = "3";
  totalItems: any;
  ratingCount : any;


  constructor(public _authService: AuthService,
    private _ratingsService: RatingsService,
    private route: ActivatedRoute,
    private router: Router,
    private matDialog:MatDialog
    ) { }

    @Output() ratingCountEvent = new EventEmitter<string>();
    
  ngOnInit(): void {
    this.route.params.subscribe((paramsId) => {
      this.id = paramsId.id;
    });

    this._ratingsService.getUserRates(this.id, '1', '3').subscribe(
      (res: any) => {
        this.rates = res;
        this.totalItems = res.meta.totalItems;
        this.ratingCount = this.totalItems;
        this.sendData();
      },
      (err) => console.log(err)
    );

  }

  getPage(p) {
    
    this._ratingsService.getUserRates(this.id,p,this.itemsPerPage).subscribe((data: any) => {
      this.rates =  data;
      this.totalItems = data.meta.totalItems;

    })
  }

  openPopUp(id){

    /*this.matDialog.open(SingleReportComponent,{ width:'60%', height:'420px', closeOnNavigation: true,
    data:{
      id:id
    }
  });*/
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

  sendData() {
    this.ratingCountEvent.emit(this.ratingCount);
  }

}
