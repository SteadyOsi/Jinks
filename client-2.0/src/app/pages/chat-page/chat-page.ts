import { Component } from '@angular/core';
import { Chat } from '../../components/chat/chat';
import { Navbar } from '../../components/navbar/navbar';
import { Sidebar } from '../../components/sidebar/sidebar';
import { EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-chat-page',
  imports: [Chat, Navbar, Sidebar],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.scss',
})
export class ChatPage {
  // The selected ID is passed down to the chat component to load its messages.
  selectedConversationId?: number;

  selectedConversation(id: number) {
    this.selectedConversationId = id;
  }
}
