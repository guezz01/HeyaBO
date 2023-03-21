import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PostsService } from '../../../services/posts.service';
import { MatDialog } from '@angular/material/dialog';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css'],
})
export class ProfilePostsComponent implements OnInit {
  id: string;
  limit: string;
  user: any;
  posts: any;
  postsCount:any;
  _subscription: Subscription;
  /*displayedColumns: string[] = [
    'postId',
    'postCreated',
    'postContent',
    'postLikes',
    'postComments',
    'postAlbum',
  ];*/
  postsPage: number;
  postsItemsPerPage = '4';
  postsTotalItems: any;

  constructor(
    public _authService: AuthService,
    private _userService: UserService,
    private _postsService: PostsService,
    private route: ActivatedRoute,
    private matDialog:MatDialog
  ) {}

  @Output() postCountEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.route.params.subscribe((paramsId) => {
      this.id = paramsId.id;
    });

    this._postsService.getPosts(this.id, '1', this.postsItemsPerPage).subscribe(
      (res: any) => {
        this.posts = res;
        this.postsTotalItems = res.meta.totalItems;
        this.postsCount=this.postsTotalItems;
        this.sendData();
      },
      (err) => console.log(err)
    );
  }


  getPage(page) {
    this._postsService
      .getPosts(this.id, page, this.postsItemsPerPage)
      .subscribe((data: any) => {
        this.posts = data;
        this.postsTotalItems = data.meta.totalItems;
      });
  }

  openPopUp(id){

    this.matDialog.open(PostComponent,{ width:'70%', height:'80%', closeOnNavigation: true, autoFocus: true,
    data:{
      id:id
    }
  });
  }
  sendData() {
      this.postCountEvent.emit(this.postsCount);
  }
}
