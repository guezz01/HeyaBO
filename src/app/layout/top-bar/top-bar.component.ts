import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  avatar : string;
  id: any;
  constructor(public _authService: AuthService) { }

  ngOnInit(): void {
    this.avatar = this._authService.getAvatar();
    this.id = this._authService.getId();
  }

}
