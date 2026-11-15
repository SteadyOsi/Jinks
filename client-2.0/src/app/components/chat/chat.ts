import { MessageInput } from './message-input/message-input';
import { MessageList } from './message-list/message-list';
import { ChatHeader } from './chat-header/chat-header';
import { Message } from '../../models/message';
import { Conversation } from '../../services/conversation';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-chat',
  imports: [ChatHeader, MessageList, MessageInput],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {
  messages = signal<Message[]>([]);

  constructor(private conversationService: Conversation) {}

  @Input() set conversationId(id: number | undefined) {
    // Clear the previous chat while nothing is selected or a new one loads.
    if (id === undefined) {
      this.messages.set([]);
      return;
    }

    this.messages.set([]);
    this.conversationService.getConversation(id).subscribe({
      // Replace the visible messages with the selected conversation's history.
      next: (conversation) => {
        this.messages.set(conversation.messages);
      },
      error: (error) => {
        console.error('Failed to load conversation messages', error);
      },
    });
  }
}
