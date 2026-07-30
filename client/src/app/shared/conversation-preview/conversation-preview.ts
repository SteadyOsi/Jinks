import { Component, Input } from '@angular/core';
import { conversationPreview } from '../../models/conversationPreview';

@Component({
  selector: 'app-conversation-preview',
  imports: [],
  standalone: true,
  templateUrl: './conversation-preview.html',
  styleUrl: './conversation-preview.scss',
})
export class ConversationPreview {
  @Input() chat!: conversationPreview;
}
