import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-alert',
  templateUrl: './mat-alert.component.html',
  styleUrls: ['./mat-alert.component.css'],
})
export class MatAlertComponent {
  message: string = '';
  processSuccess: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<MatAlertComponent>,
    @Inject(MAT_DIALOG_DATA) data: { message: string, processSuccess: boolean }
  ) {
    this.message = data ? data.message : '';
    this.processSuccess = data ? data.processSuccess : false;
  }

  closeAlert() {
    this.dialogRef.close();
  }

  viewBooking() {
    // Handle view booking action
    console.log('ok')
  }

  tryAgain() {
    // Handle try again action
    this.closeAlert();
  }
}