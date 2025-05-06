import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { User } from '../Models/user.model';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-emergency-screen',
  templateUrl: './emergency-screen.component.html',
  styleUrls: ['./emergency-screen.component.css']
})
export class EmergencyScreenComponent implements OnInit {
  expertises = ['Plumber', 'Electrician', 'Locksmith'];
  selectedExpertise = '';
  user: User | null = null;
  emergencies: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.user = this.data.user;

  }

  issueEmergencyHelp(expertise: string) {
    const apiUrl = 'http://localhost:8080/api/bookings/addEmergency';
    if (this.user) {
      const bookingEmergencyData = {
        userId: this.user.user_id,
        expertise: expertise,
        status: 'emergency'
      };
      this.http.post(apiUrl, bookingEmergencyData).subscribe(
        response => {
          console.log('Emergency request created:', response);
        },
        error => {
          console.error('Error creating emergency request:', error);
        }
      );
    }
  }

}
