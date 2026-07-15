import { Component } from '@angular/core';
import { ConversationService } from '../../services/conversation';

@Component({
  selector: 'app-conversations',
  imports: [],
  templateUrl: './conversations.html',
  styleUrl: './conversations.scss',
})
export class Conversations {
    constructor(private convo: ConversationService) {} 

    loadConversations() {
    this.convo.getConversations().subscribe(data => {
      console.log(data);
    });
  }
}
