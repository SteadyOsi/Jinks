import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { conversationPreview } from '../models/conversationPreview';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  constructor(private http: HttpClient) {}

  getConversationsPreview() {
    // change this to get a list of conversations with the last message.
    return this.http.get<conversationPreview[]>(`http://localhost:3000/conversations/preview`);
  }
}
