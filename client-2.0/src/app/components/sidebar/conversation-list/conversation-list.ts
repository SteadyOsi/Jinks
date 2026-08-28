import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConversationPreview } from '../../../models/conversation';
import { interval, Subscription } from 'rxjs';
import { Conversation } from '../../../services/conversation';
import { Chat } from "../../chat/chat";

@Component({
  selector: 'app-conversation-list',
  imports: [Chat],
  templateUrl: './conversation-list.html',
  styleUrl: './conversation-list.scss',
})

export class ConversationList implements OnInit, OnDestroy{
  
  conversations: ConversationPreview[] = []; // holds a list of previews

  private pollingSubscription?: Subscription;

  constructor(private conversationService: Conversation) {}

  ngOnInit() { // runs on 
    this.pollingSubscription = interval(5000).subscribe(() => {
      this.loadThumbNail();

      console.log(this.conversations);
    });
  }

  loadThumbNail() { // makes the call
    return this.conversationService.getThumbNail().subscribe((data) => {
      this.conversations = data;
    });
  }

  ngOnDestroy() { // 
    this.pollingSubscription?.unsubscribe();
  }
}
