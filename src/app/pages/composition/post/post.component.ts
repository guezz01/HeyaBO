import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PostsService } from '../../../services/posts.service';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  id:string;
  post:any;
  comments : any;
  slides: any[] ;
  today = new Date();

  constructor(public _authService: AuthService, private _postsService:PostsService,
    private route : ActivatedRoute, private router: Router, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {

    this.route.params.subscribe(paramsId => {
      this.id = paramsId.id;
      
  });
  this.id = this.data.id;
console.log(this.today.toISOString());
  this._postsService.getSinglePost(this.id)
  .subscribe(
    res => {
      this.post= res;
      this.slides = new Array(this.post.medias.length) ;
      this.slides = this.post.medias;
      console.log(this.slides);
    },
    err => console.log(err)
  )

  this._postsService.getPostComments(this.id)
  .subscribe(
    resources => {
      this.comments= resources;
      console.log(this.comments.items[0].createdAt);
    },
    err => console.log(err)
  )
  
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);

}

redirectTo(uri:string){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate([uri]));
}


}

