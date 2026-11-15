import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConversationPreview, ConversationDetails } from '../models/conversation';

@Injectable({
  providedIn: 'root',
})
export class Conversation {
  constructor(private http: HttpClient) {}

  // Fetch the compact data used to populate the sidebar conversation list.
  getThumbNail() {
    return this.http.get<ConversationPreview[]>('http://localhost:3000/conversations/preview');
  }

  // Fetch one conversation together with its messages for the chat pane.
  getConversation(conversationID: number) {
    return this.http.get<ConversationDetails>(
      `http://localhost:3000/conversations/${conversationID}`,
    );
  }
}
