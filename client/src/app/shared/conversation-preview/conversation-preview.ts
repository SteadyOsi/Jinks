import { Component, Input } from '@angular/core';
import { ConversationWithMessages } from '../../models/conversationWithMessages';

@Component({
  selector: 'app-conversation-preview',
  imports: [],
  standalone: true,
  templateUrl: './conversation-preview.html',
  styleUrl: './conversation-preview.scss',
})
export class ConversationPreview {
  @Input()
  chat!: ConversationWithMessages;
}

