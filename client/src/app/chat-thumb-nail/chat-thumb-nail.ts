import { Component, OnInit } from '@angular/core';

import { ConversationService } from '../services/conversation';
import { conversationPreview } from '../models/conversationPreview';
import { ConversationPreview } from '../shared/conversation-preview/conversation-preview';

@Component({
  selector: 'app-chat-thumb-nail',
  standalone: true,
  imports: [ConversationPreview],
  templateUrl: './chat-thumb-nail.html',
  styleUrl: './chat-thumb-nail.scss',
})
export class ChatThumbNail implements OnInit {
  constructor(private convo: ConversationService) {}
  conversations: conversationPreview[] = [];

  ngOnInit() {
    this.loadConversations();
  }

  loadConversations() {
    this.convo.getConversationsPreview().subscribe((data) => {
      this.conversations = data;
    });
  }

  trackByConversation(index: number, conversation: conversationPreview) {
    return conversation.id;
  }
}
