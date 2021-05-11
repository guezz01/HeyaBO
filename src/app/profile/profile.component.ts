import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../services/reports.service';
import { Lightbox, LightboxEvent, LIGHTBOX_EVENT } from 'ngx-lightbox';
import { Subscription } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id:string;
  limit:string;
  user:any;
  posts:any;
  postsTotalItems;
  lastReports:any;
  _subscription: Subscription;
  _gallery: Array<any> = [];

  constructor(public _authService: AuthService, private _userService:UserService, private _profileService:ProfileService, private _reportService:ReportsService, private route : ActivatedRoute, private _lightbox: Lightbox, private _lightboxEvent: LightboxEvent) { 
  
  }

  ngOnInit(): void {

    this.route.params.subscribe(paramsId => {
      this.id = paramsId.id;
      
  });
  this._userService.getUser(this.id)
  .subscribe(
    res => {
      this.user= res;
    },
    err => console.log(err)
  ) 
  
    this._reportService.getUserReportByAdmin(this.id,"5")
    .subscribe(
      res => {
        this.lastReports= res;
      },
      err => console.log(err)
    )
    this.getPosts();
    
  }



  populateGallery(){

    let userGallery:Array<any>=[];
    let _albums:Array<any>=[];
    for (let post of this.posts.items) {

      const postId =post.id
      const postCreated = post.createdAt
      const postUpdated = post.updatedAt
      const postContent = post.content
      const  postLikes = post.likes
      const postComments = post.comments

      for (let media of post.medias) {

        const src = media.path;
        const id = media.id;
        const caption = "test";
        const thumb = media.path;
        const album = {
          id: id,
          src: src,
          caption: caption,
          thumb: thumb
       };
 
       _albums.push(album);
      }

     
      const gallery = {
        postId: postId,
        postCreated: postCreated,
        postUpdated: postUpdated,
        postContent: postContent,
        postLikes: postLikes,
        postComments: postComments,
        postAlbum: _albums
     };
      userGallery.push(gallery);
      _albums =[];
    }
    
    this._gallery=userGallery;
    console.log(this._gallery);
  }

  getPosts(){

    this._profileService.getPosts(this.id,"1","50")
    .subscribe(
      res => {
        this.posts= res;
        this.populateGallery();
      },
      err => console.log(err)
    ) 

  }

  open(index: number, index2:number): void {
    // open lightbox
    this._lightbox.open(this._gallery[index].postAlbum, index2);
  }

  private _onReceivedEvent(event: any): void {
    // remember to unsubscribe the event when lightbox is closed
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      // event CLOSED is fired
      this._subscription.unsubscribe();
    }

    if (event.id === LIGHTBOX_EVENT.OPEN) {
      // event OPEN is fired
    }

    if (event.id === LIGHTBOX_EVENT.CHANGE_PAGE) {
      // event change page is fired
      console.log(event.data); // -> image index that lightbox is switched to
    }
  }
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
