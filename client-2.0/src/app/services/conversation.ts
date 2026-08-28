import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConversationPreview } from '../models/conversation'

@Injectable({
  providedIn: 'root',
})
export class Conversation {
  constructor(private http: HttpClient) {}

  getThumbNail() {
    return this.http.get<ConversationPreview[]>('http://localhost:3000/conversations/preview');
  }
}
