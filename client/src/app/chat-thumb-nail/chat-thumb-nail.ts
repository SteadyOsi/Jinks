import { Component } from '@angular/core';

import { ConversationService } from '../services/conversation';
import { conversationPreview } from '../models/conversationPreview';
import { ConversationPreview } from '../shared/conversation-preview/conversation-preview';

@Component({
  selector: 'app-chat-thumb-nail',
  imports: [ConversationPreview],
  templateUrl: './chat-thumb-nail.html',
  styleUrl: './chat-thumb-nail.scss',
})
export class ChatThumbNail {
  constructor(private convo: ConversationService) {}
  conversations: conversationPreview[] = [];

  loadConversations() {
    // change this to get a list of conversations with the last message.
    this.convo.getConversationsPreview().subscribe((data) => {
      this.conversations = data;
      console.log(this.conversations);
    });
  }
}
