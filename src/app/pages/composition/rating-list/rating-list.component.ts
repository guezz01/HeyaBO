import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RatingsService } from 'src/app/services/ratings.service';
import { SingleRatingComponent } from '../single-rating/single-rating.component';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.css']
})
export class RatingListComponent implements OnInit {

  results:any;
  p: number;
  itemsPerPage = "5";
  totalItems: any;
  searchTerm: string;

  constructor(public _authService: AuthService, private _ratingService:RatingsService, private matDialog:MatDialog, private router: Router) { }

  ngOnInit(): void {

    this._ratingService.searchUserRatesByAdmin("","1",this.itemsPerPage)
    .subscribe(
      res => {
        this.results= res;
        this.totalItems = res.meta.totalItems;
      },
      err => console.log(err)
    )

  }

  openPopUp(id){
    console.log("rating dialog");
    this.matDialog.open(SingleRatingComponent,{ width:'60%', height:'420px', closeOnNavigation: true,
    data:{
      id:id
    }
  });
  }




  searchReportsByAdmin(page){
    this._ratingService.searchUserRatesByAdmin(this.searchTerm,page,this.itemsPerPage).subscribe((data: any) => {
      this.results =  data;
      this.totalItems = data.meta.totalItems;
      console.log(this.results);
    })
  }

  resetFilters(){
    this.searchTerm=null;
    this._ratingService.searchUserRatesByAdmin("","1",this.itemsPerPage)
    .subscribe(
      res => {
        this.results= res;
        this.totalItems = res.meta.totalItems;
      },
      err => console.log(err)
    )
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }


}
