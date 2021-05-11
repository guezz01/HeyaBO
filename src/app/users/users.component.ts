import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  results:any;
  p: number;
  itemsPerPage = "10";
  totalItems: any;

  constructor(public _authService: AuthService, private _userService:UserService) { }

  ngOnInit(): void {
    this._userService.getUsers("1","10")
    .subscribe(
      res => {
        this.results= res;
        this.totalItems = res.meta.totalItems;
      },
      err => console.log(err)
    )

  }

  getPageUser(page) {
    
    this._userService.getUsers(page,this.itemsPerPage).subscribe((data: any) => {
      this.results =  data;
      this.totalItems = data.meta.totalItems;

    })
  }

}
