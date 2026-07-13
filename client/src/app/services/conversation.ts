import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Conversation {
  constructor(private http: HttpClient) {}  

  getConversations() {
    return this.http.get("/conversations/");
  }
}
