import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {conversationWithMessages} from '../models/conversationWithMessages'

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  constructor(private http: HttpClient) {}  

  getConversations(id: number) {
    return this.http.get<conversationWithMessages>(`http://localhost:3000/conversations/${id}`);
  }
}
