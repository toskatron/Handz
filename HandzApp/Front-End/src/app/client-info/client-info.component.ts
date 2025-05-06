import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Handyman, HandymanService} from "../Models/handyman.model";
import {User, UserService} from "../Models/user.model";

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {
  // Define the type inline to match your client information structure
  clientInfo: User | null = null;
  constructor(private authService: AuthService, private handy:UserService) {}

  ngOnInit() {
    if(this.handy.getUser())
    this.clientInfo = this.handy.getUser();
  }
}
