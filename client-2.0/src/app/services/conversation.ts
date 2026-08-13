import { Injectable } from '@angular/core';
import { Httpclient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class Conversation {
  constructor(private http: Httpclient){}

  
  getThumbNail(){
    return this.http.get('http://localhost:3000/messages');
  }
  
}
s