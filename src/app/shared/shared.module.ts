import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatDialogModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatLineModule,
  MatSidenavModule,
  MatTabsModule
}
  from '@angular/material';
import { NoRecordComponent } from './components/no-record/no-record.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { FromNowPipe } from './pipes/from-now.pipe';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';


@NgModule({
  declarations: [
    NoRecordComponent,
    AvatarComponent,
    FromNowPipe,
    ImagePreviewComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule
  ],
  exports: [
    AvatarComponent,
    CommonModule,
    FormsModule,
    FromNowPipe,
    ImagePreviewComponent,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatLineModule,
    MatListModule,
    MatMenuModule,
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
