import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { NoRecordComponent } from './components/no-record/no-record.component';


@NgModule({
  declarations: [
    NoRecordComponent
  ],
  imports: [
    MatIconModule
  ],
  exports: [
    CommonModule,
    FormsModule,
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
    NoRecordComponent,
    MatSlideToggleModule,
    MatSnackBarModule
  ]
})
export class SharedModule { }
