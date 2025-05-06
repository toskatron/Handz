import { Component } from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import { RegHandymanService } from '../reg-handyman.service';
import {Handyman, HandymanService} from "../Models/handyman.model";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Service } from '../Models/service.model';
import { Booking } from '../Models/booking.model';
import { ClientComponent } from '../create_user_account/client.component';
@Component({
  selector: 'app-mester',
  templateUrl: './mester.component.html',
  styleUrls: ['./mester.component.css']
})
export class MesterComponent {
  mester = {
    name: '',
    email: '',
    password: '',
    imageURL: '',
    expertise: '',
    phoneNumber: '',
    services: [] as Service[],
    bookings: [] as Booking[]
  };
  expertise:String | undefined;
  selectedCountry: any;
  dialogRef: MatDialogRef<ClientComponent> | null = null;

  constructor(private http:HttpClient, private handymanService: HandymanService, private regService: RegHandymanService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  onImageSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    
    if (fileList && fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('profileImage', file, file.name);

      // Send the image to the server using a POST request
      this.http.post('http://localhost:8080/api/handyman/uploadImage', formData, {
          responseType: 'text' // Handle response as JSON
      }).subscribe(
          (response: any) => {
              console.log('Image upload response:', response);
              if (response) {
                  // Handle success and use the imageURL
                  this.mester.imageURL = response;
                  console.log('Image URL:', this.mester.imageURL);
              } else {
                  console.error('Image URL not found in response');
                  // Handle error, imageURL is not available in response
              }
          },
          (error) => {
              console.error('Image upload error:', error);
              // Handle error here
          }
      );
    }
  }

  openClientDialog(): void {
  if (this.dialogRef) {
    this.dialogRef.close();
  }

  this.dialogRef = this.dialog.open(ClientComponent, {
    width: '50%',
  });

  this.dialogRef.afterClosed().subscribe(result => {
    console.log('The client dialog was closed');
  });
}
  
  showConfirmation(handyman: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { handyman },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        handyman.showBookingConfirmation = true;
        alert('Booking confirmed!');
      }
    });
  }

  validateEmail(emailField: NgModel): void {
    if (emailField.value && typeof emailField.value === 'string' && !emailField.value.includes('@')) {
      emailField.control.setErrors({ 'invalidEmail': true });
    } else {
      this.clearInvalidEmailError(emailField);
    }
  }

  clearInvalidEmailError(emailField: NgModel) {
    if (emailField.errors && emailField.errors['invalidEmail']) {
      delete emailField.errors['invalidEmail'];
      if (Object.keys(emailField.errors).length === 0) {
        emailField.control.setErrors(null);
      }
    }
  }
  /*
  onExpertiseChange() {
    if (this.expertise) {
      const filterUrl = `http://localhost:8080/api/services/filter?expertise=${this.expertise}`;
      this.http.get(filterUrl).subscribe(
        response => {
          // Assuming the response is an array of service objects
          this.mester.services = response as any[];
        },
        error => {
          console.error('Error occurred while fetching services', error);
        }
      );
      
    }
  }*/

  onSubmit() {
    const url = 'http://localhost:8080/api/handyman/add';
    console.log('Handyman to be parsed:',this.mester);
    this.http.post(url, this.mester).subscribe(
      response => {
        console.log('Handyman account created', response);
        // Handle the response here.
      },
      error => {
        console.error('Error occurred while creating account', error);
        // Handle the error here.
      }
    );
  }
}
