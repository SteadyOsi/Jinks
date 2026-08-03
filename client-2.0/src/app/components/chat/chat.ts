import { Component } from '@angular/core';
import { MessageInput } from './message-input/message-input';
import { MessageList } from './message-list/message-list';
import { ChatHeader } from './chat-header/chat-header';

@Component({
  selector: 'app-chat',
  imports: [ChatHeader, MessageList, MessageInput],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {}
