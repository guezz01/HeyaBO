import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  results:any;
  p: number;
  itemsPerPage = "6";
  totalItems: any;
  selectedRole: string;
  searchTerm: string;
  role:string;


  constructor(public _authService: AuthService, private _userService:UserService) { }

  ngOnInit(): void {

    this._userService.searchUserByAdmin("","","1",this.itemsPerPage)
    .subscribe(
      res => {
        this.results= res;
        this.totalItems = res.meta.totalItems;
      },
      err => console.log(err)
    )

  }

  searchUsersByAdmin(page){
    if(this.selectedRole){
      console.log("role "+this.selectedRole)
      this.role = this.selectedRole === "client" ? "2" : "3"
    }
    this._userService.searchUserByAdmin(this.searchTerm,this.role,page,this.itemsPerPage).subscribe((data: any) => {
      this.results =  data;
      this.totalItems = data.meta.totalItems;
      console.log(this.results);
    })
  }

  resetFilters(){
    this.selectedRole=null;
    this.role=null;
    this.searchTerm=null;
    this._userService.searchUserByAdmin("","","1",this.itemsPerPage)
    .subscribe(
      res => {
        this.results= res;
        this.totalItems = res.meta.totalItems;
      },
      err => console.log(err)
    )
  }

  refresh(): void {
    window.location.reload();
  }

}
