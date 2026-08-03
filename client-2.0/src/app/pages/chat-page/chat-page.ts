import { Component } from '@angular/core';
import { Chat } from '../../components/chat/chat';
import { Navbar } from '../../components/navbar/navbar';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  standalone: true,
  selector: 'app-chat-page',
  imports: [Chat, Navbar, Sidebar],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.scss',
})
export class ChatPage {}
