import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User;
  isEditing = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(JSON.stringify(this.authService.authUser));
  }

  onSave(): void {
    console.log('User: ', this.user);
  }

}
