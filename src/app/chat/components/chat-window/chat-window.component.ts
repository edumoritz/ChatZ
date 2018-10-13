import { map, mergeMap, tap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Chat } from '../../models/chat.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnDestroy, OnInit {

  chat: Chat;
  recipientId: string = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.data
        .pipe(
          map(routeData => this.chat = routeData.chat),
          mergeMap(() => this.route.paramMap),
          tap((params: ParamMap) => {
            if(!this.chat) {
              this.recipientId = params.get('id');
              console.log('User id: ', this.recipientId);
            }
          })
        )
        .subscribe()
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
