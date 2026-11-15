import { Component, Input } from '@angular/core';
import { Message } from '../../../models/message';

@Component({
  selector: 'app-message-list',
  imports: [],
  templateUrl: './message-list.html',
  styleUrl: './message-list.scss',
})
export class MessageList {
  // Messages are supplied by the parent chat component for rendering.
  @Input() messages: Message[] = [];
}
