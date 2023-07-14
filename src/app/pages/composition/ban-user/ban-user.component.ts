import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ReportsService } from '../../../services/reports.service';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ban-user',
  templateUrl: './ban-user.component.html',
  styleUrls: ['./ban-user.component.css']
})
export class BanUserComponent implements OnInit {
  minDate = new Date();
  id:number;
  user:any;
  reason:string;
  bannedUntil : Date;
  //updateData = new EventEmitter<any>();

  constructor(public _authService: AuthService, private _userService:UserService,
     private route : ActivatedRoute, private router: Router, @Inject(MAT_DIALOG_DATA) public data, public dialog:MatDialog,
     public dialogRef: MatDialogRef<BanUserComponent>) {
   }

   
  doAction(){
    this.dialogRef.close({data:this.user});
  }

  ngOnInit(): void {
    this.id = this.data.id;
    this.user = this.data;
  //this.loadReport(this.id);

  }

  async banUser(){
    try{
    this._userService.banUser(this.reason,this.id,this.bannedUntil).subscribe(
      res => {
        this.user.status = 3;
        //this.doAction();
      },
      err => console.log(err)
    );

    //this.loadReport(this.id);
  }
  catch(error){
    console.log(error);
  }
    //this.redirectTo("/report/"+this.id);
    //this.dialog.closeAll();
    //this._reportService.filter("closed");
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.bannedUntil = event.value;
    console.log(event.value);
    console.log(this.bannedUntil);
  }
  
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

}
