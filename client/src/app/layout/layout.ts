import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar'
import { ChatWindow } from '../chat-window/chat-window';

@Component({
  selector: 'app-layout',
  imports: [Sidebar, ChatWindow],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
