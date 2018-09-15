import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatListModule,
  MatIconModule,
  MatLineModule,
  MatSidenavModule,
  MatTabsModule
}
  from '@angular/material';


@NgModule({
  exports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatLineModule,
    MatListModule,
    MatTabsModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ]
})
export class SharedModule { }
