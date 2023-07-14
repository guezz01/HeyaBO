import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  id: string;
  limit: string;
  user: any;
  posts: any;
  postsCount:any;
  _subscription: Subscription;
  postsPage: number;
  postsItemsPerPage = '5';
  postsTotalItems: any;
  searchTerm: string;

  constructor(
    public _authService: AuthService,
    private _postsService: PostsService,
    private matDialog:MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {

    this._postsService.getPostsByAdmin(this.id, '1', this.postsItemsPerPage).subscribe(
      (res: any) => {
        this.posts = res;
        this.postsTotalItems = res.meta.totalItems;
        this.postsCount=this.postsTotalItems;
        console.log(this.posts);
      },
      (err) => console.log(err)
    );
  }


  searchPostsByAdmin(page){
    this.postsPage = page;
    this._postsService.getPostsByAdmin(this.searchTerm,page,this.postsItemsPerPage).subscribe((data: any) => {
      this.posts =  data;
      this.postsTotalItems = data.meta.totalItems;
      console.log(this.posts);
    })
  }

  openPopUp(id){

    this.matDialog.open(PostComponent,{ width:'70%', height:'80%', closeOnNavigation: true, autoFocus: true,
    data:{
      id:id
    }
  });
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

 resetFilters(){
  this.searchTerm=null;
  this._postsService.getPostsByAdmin("","1",this.postsItemsPerPage)
  .subscribe(
    res => {
      this.posts= res;
      this.postsPage = 1;
      this.postsTotalItems = res.meta.totalItems;
    },
    err => console.log(err)
  )
}

}
