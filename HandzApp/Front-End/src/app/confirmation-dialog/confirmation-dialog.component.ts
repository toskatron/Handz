import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  handyman: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  confirmBooking() {

  }

  cancelBooking() {

  }
}
