import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  constructor(private http: HttpClient) {}  

  getConversations() {
    return this.http.get("http://localhost:3000/conversations/");
  }
}
