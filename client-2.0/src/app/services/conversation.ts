import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Conversation {
  constructor(private http: HttpClient) {}

  getThumbNail() {
    return this.http.get('http://localhost:3000/messages');
  }
}
