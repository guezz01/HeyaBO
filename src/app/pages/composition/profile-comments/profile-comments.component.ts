import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostComponent } from '../post/post.component';
import { CommentsService } from '../../../services/comments.service';

@Component({
  selector: 'app-profile-comments',
  templateUrl: './profile-comments.component.html',
  styleUrls: ['./profile-comments.component.css']
})
export class ProfileCommentsComponent implements OnInit {

  id: string;
  limit: string;
  user: any;
  comments: any;
  commentCount : any;
  _subscription: Subscription;
  /*displayedColumns: string[] = [
    'postId',
    'postCreated',
    'postContent',
    'postLikes',
    'postComments',
    'postAlbum',
  ];*/
  commentsPage: number;
  commentsItemsPerPage = '3';
  commentsTotalItems: any;

  constructor(
    private route: ActivatedRoute,
    private _commentsService: CommentsService,
    private matDialog:MatDialog
    ) { }

    @Output() commentCountEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.route.params.subscribe((paramsId) => {
      this.id = paramsId.id;
    });

    this._commentsService.getUserComments(this.id, '1', '3').subscribe(
      (res: any) => {
        this.comments = res;
        this.commentsTotalItems = res.meta.totalItems;
        this.commentCount = this.commentsTotalItems;
        this.sendData();
      },
      (err) => console.log(err)
    );
  }

  getPage(page) {
    this._commentsService
      .getUserComments(this.id, page, this.commentsItemsPerPage)
      .subscribe((data: any) => {
        this.comments = data;
        this.commentsTotalItems = data.meta.totalItems;
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
    this.commentCountEvent.emit(this.commentCount);
  }

}
