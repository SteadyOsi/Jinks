import { Component } from '@angular/core';
import { ConversationList } from './conversation-list/conversation-list';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [ConversationList],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  // Re-emit a selection from the nested list to the chat page.
  @Output() conversationSelected = new EventEmitter<number>();
}
