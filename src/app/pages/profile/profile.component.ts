
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ReportsService } from 'src/app/services/reports.service';
import { SingleReportComponent } from '../composition/single-report/single-report.component';
import { PostComponent } from '../composition/post/post.component';
import { BanUserComponent } from '../composition/ban-user/ban-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id:string;
  limit:string;
  user:any;
  postsCount:any;
  commentsCount:any;
  ratingsCount:any;
  lastReports:any;
  _subscription: Subscription;
  _gallery: Array<any> = [];
  closeModal: string;
  displayedColumns: string[] = ['postId', 'postCreated', 'postContent', 'postLikes', 'postComments', 'postAlbum'];
  dataSource!:MatTableDataSource<any>;
  postsPage: number;
  postsItemsPerPage = "3";
  postsTotalItems: any;
  isLoadingResults = true;
  isRateLimitReached = false;
  
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  constructor(public _authService: AuthService, private _userService:UserService,
     private _profileService:ProfileService, private _reportService:ReportsService,
      private route : ActivatedRoute, private matDialog: MatDialog, public dialog:MatDialog) { 

        this.dialog.closeAll();
  
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
  }

  postsCountData(data: string) {
    this.postsCount = data;
    console.log("parent "+this.postsCount);
  }

  commentsCountData(data: string) {
    this.commentsCount = data;
  }

  ratingsCountData(data: string) {
    this.ratingsCount = data;
  }

  /*banUser(){
    this._userService.banUser(this.id).subscribe(
      res => {
        console.log(res.status);
        this.user.status = res.status;
      },
      err => console.log(err)
    ) 
    console.log("ban");
  }*/

  unBanUser(){
    this._userService.unBanUser(this.id)
  .subscribe(
    res => {
      console.log(res);
      this.user.status = res.status;
    },
    err => console.log(err)
  ) 
  }

  updateData(obj){
        this.user.status = obj.status;
      return true;
  }

  openPopUp(user){

    const dialogRef = this.matDialog.open(BanUserComponent,{ width:'60%', height:'450px', closeOnNavigation: true,
    data:user
  });

  dialogRef.afterClosed().subscribe(result => {
      this.updateData(result.data);
  });
  }
  
}
