import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Message {
  constructor(private http: HttpClient) {}

  getMessages() {
    return null;
  }
}
