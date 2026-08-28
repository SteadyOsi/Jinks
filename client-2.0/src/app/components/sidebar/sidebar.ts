import { Component } from '@angular/core';
import { ConversationList } from './conversation-list/conversation-list';

@Component({
  selector: 'app-sidebar',
  imports: [ ConversationList],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  
}
