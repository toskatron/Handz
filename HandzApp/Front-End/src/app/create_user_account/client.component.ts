import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MesterComponent } from '../handyman_create_account/mester.component';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  user = {
    name: '',
    email: '',
    password: '',
    imageURL: '',
    phoneNumber: '',
    bookings: []
  };
  dialogRef: MatDialogRef<MesterComponent> | null = null;
  constructor(public dialog: MatDialog,private http: HttpClient) { }

  

  validateEmail(emailField: NgModel): void {
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
  onSubmit() {
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
  
  onImageSelected(event: Event): void {
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

  openMesterDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  
    this.dialogRef = this.dialog.open(MesterComponent, {
      width: '50%',
    });
  
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The mester dialog was closed');
    });
  }
  
}
