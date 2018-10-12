import { ChatService } from './../../services/chat.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Chat } from './../../models/chat.model';
import { Observable } from 'rxjs';


@Injectable()
export class ChatWindowResolver implements Resolve<Chat>{

  constructor(
    private chatService: ChatService
  ) {}

  // /dashboard/chat/:id
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Chat> {
    const chatOrUserId: string = route.paramMap.get('id');
    return this.chatService.getChatByIdOrByUsers(chatOrUserId);
  }

}
