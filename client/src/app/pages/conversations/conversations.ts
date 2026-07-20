import { Component } from '@angular/core';
import { ConversationService } from '../../services/conversation';
import { ConversationWithMessages } from '../../models/conversationWithMessages';

@Component({
  selector: 'app-conversations',
  imports: [],
  templateUrl: './conversations.html',
  styleUrl: './conversations.scss',
})
export class Conversations {
  constructor(private convo: ConversationService) {}
  conversation?: conversationWithMessages;
  a = 3;
  b = 2;

  loadConversations() {
    this.convo.getConversations(1).subscribe((data) => {
      this.conversation = data;
    });
  }
}
