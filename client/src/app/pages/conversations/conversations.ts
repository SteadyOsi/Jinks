import { Component } from '@angular/core';
import { ConversationService } from '../../services/conversation';
import { ConversationPreviewMod } from '../../models/conversationPreviewMod';
import { ConversationPreview } from '../../shared/conversation-preview/conversation-preview';

@Component({
  selector: 'app-conversations',
  imports: [ConversationPreview],
  templateUrl: './conversations.html',
  styleUrl: './conversations.scss',
})
export class Conversations {
  constructor(private convo: ConversationService) {}
  conversations: ConversationPreviewMod[] = [];

  loadConversations() {
    // change this to get a list of conversations with the last message.
    this.convo.getConversationsPreview().subscribe((data) => {
      this.conversations = data;
      console.log(this.conversations);
    });
  }
}
