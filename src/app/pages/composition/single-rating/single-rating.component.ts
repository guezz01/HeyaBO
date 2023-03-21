import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RatingsService } from '../../../services/ratings.service';

@Component({
  selector: 'app-single-rating',
  templateUrl: './single-rating.component.html',
  styleUrls: ['./single-rating.component.css']
})
export class SingleRatingComponent implements OnInit {

  id:string;
  rating:any;

  constructor(public _authService: AuthService, private _ratingService:RatingsService,
     private route : ActivatedRoute, private router: Router, @Inject(MAT_DIALOG_DATA) public data, public dialog:MatDialog) {

   }

  ngOnInit(): void {

    
    this.id = this.data.id;
    console.log("id = "+this.id);
  this.loadRating(this.id);

  }

  loadRating(id){

    this._ratingService.getRatingById(id)
    .subscribe(
      res => {
        this.rating= res;
      },
      err => console.log(err)
    ) 

  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }


}
