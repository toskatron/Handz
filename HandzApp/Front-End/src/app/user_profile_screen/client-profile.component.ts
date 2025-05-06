import { Component } from '@angular/core';
import {User, UserService} from "../Models/user.model";
import { MatDialog } from '@angular/material/dialog';
import { EmergencyScreenComponent } from '../emergency-screen/emergency-screen.component';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent {


  clientInfo: User | null = null;
  constructor(private userService:UserService,private dialog: MatDialog) {
  }

  ngOnInit(){
    this.clientInfo = this.userService.getUser();
    
  }

  openEmergencyScreen(user : User |null) {

    const dialogRef = this.dialog.open(EmergencyScreenComponent, {
      width: '1200px',
      height: '700px',
      data: {
        user : user
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The client dialog was closed');
    });

  }
}
