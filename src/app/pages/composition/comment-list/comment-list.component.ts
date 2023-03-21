import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  limit: string;
  user: any;
  comments: any;
  postsPage: number;
  itemsPerPage = '5';
  totalItems: any;
  searchTerm: string;

  constructor(
    public _authService: AuthService,
    private _commentService: CommentsService,
    private matDialog:MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {

    this._commentService.getSearchByAdmin("", '1', this.itemsPerPage).subscribe(
      (res: any) => {
        this.comments = res;
        this.totalItems = res.meta.totalItems;
      },
      (err) => console.log(err)
    );
  }


  searchCommentsByAdmin(page){
    this._commentService.getSearchByAdmin(this.searchTerm,page,this.itemsPerPage).subscribe((data: any) => {
      this.comments =  data;
      this.totalItems = data.meta.totalItems;
      console.log(this.comments);
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
  this._commentService.getSearchByAdmin("","1",this.itemsPerPage)
  .subscribe(
    res => {
      this.comments= res;
      this.totalItems = res.meta.totalItems;
    },
    err => console.log(err)
  )
}


}
