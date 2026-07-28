import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar'
import { ChatWindow } from '../chat-window/chat-window';
import { ChatThumbNail } from '../chat-thumb-nail/chat-thumb-nail';

@Component({
  selector: 'app-layout',
  imports: [Sidebar, ChatWindow, ChatThumbNail],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
