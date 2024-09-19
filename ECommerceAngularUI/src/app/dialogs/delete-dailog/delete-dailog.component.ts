import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dailog',
  templateUrl: './delete-dailog.component.html',
  styleUrl: './delete-dailog.component.scss'
})
export class DeleteDailogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  close(): void {
    this.dialogRef.close();
  }
}

export enum DeleteState {
  Yes,
  No
}