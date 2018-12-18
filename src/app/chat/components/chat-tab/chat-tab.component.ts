import { ChatService } from './../../services/chat.service';
import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-chat-tab',
  template: `
    <nav mat-tab-nav-bar backgroundColor="primary">
      <a mat-tab-link
        routerLink="./"
        routerLinkActive
        #chatsRla="routerLinkActive"
        [active]="chatsRla.isActive"
        [routerLinkActiveOptions]="{exact: true}">
        Chats
      </a>

      <a mat-tab-link
        routerLink="users"
        routerLinkActive
        #usersRla="routerLinkActive"
        [active]="usersRla.isActive">
        Users
      </a>
    </nav>

    <router-outlet></router-outlet>

  `
})
export class ChatTabComponent {

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.chatService.startChatsMonitoring();
    this.userService.startUsersMonitoring(this.authService.authUser.id);
  }
}
