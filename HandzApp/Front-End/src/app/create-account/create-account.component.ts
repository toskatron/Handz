import { Component } from '@angular/core';
import { Service } from '../Models/service.model';
import { Booking } from '../Models/booking.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientComponent } from '../create_user_account/client.component';
import { HttpClient } from '@angular/common/http';
import { HandymanService } from '../Models/handyman.model';
import { RegHandymanService } from '../reg-handyman.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  isSwitchedOn: Boolean=true;
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
  user = {
    name: '',
    email: '',
    password: '',
    imageURL: '',
    phoneNumber: '',
    bookings: []
  };
  expertise:String | undefined;
  selectedCountry: any;
  dialogRef: MatDialogRef<ClientComponent> | null = null;

  constructor(private http:HttpClient, private handymanService: HandymanService, private regService: RegHandymanService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  onImageSelectedMester(event: Event): void {
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

  validateEmailMester(emailField: NgModel): void {
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
  

  onSubmitMester() {
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

 
  
  

  

  validateEmailClient(emailField: NgModel): void {
    if (emailField.value && !emailField.value.includes('@')) {
      emailField.control.setErrors({ 'invalidEmail': true });
    } else {

      if (emailField.errors && emailField.errors['invalidEmail']) {
        delete emailField.errors['invalidEmail'];
      }
      if (emailField.errors && Object.keys(emailField.errors).length === 0) {
        emailField.control.setErrors(null);
      }
    }
  }
  onSubmitClient() {
    const url = 'http://localhost:8080/api/user/add';
    this.http.post(url, this.user).subscribe(
      response => {
        console.log('Account created', response);
        // Handle the response here. Maybe navigate to a different page or show a success message.
      },
      error => {
        console.error('Error occurred while creating account', error);
        // Handle the error here. Maybe show an error message to the user.
      }
    );
  }
  
  onImageSelectedClient(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    
    if (fileList && fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('profileImage', file, file.name);

      // Send the image to the server using a POST request
      this.http.post('http://localhost:8080/api/user/uploadImage', formData, {
          responseType: 'text' // Handle response as JSON
      }).subscribe(
          (response: any) => {
              console.log('Image upload response:', response);
              if (response) {
                  // Handle success and use the imageURL
                  this.user.imageURL = response;
                  console.log('Image URL:', this.user.imageURL);
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

}
