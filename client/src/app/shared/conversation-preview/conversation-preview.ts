import { Component, Input } from '@angular/core';
import { ConversationPreviewMod } from '../../models/conversationPreviewMod';

@Component({
  selector: 'app-conversation-preview',
  imports: [],
  standalone: true,
  templateUrl: './conversation-preview.html',
  styleUrl: './conversation-preview.scss',
})
export class ConversationPreview {
  @Input() chat!: ConversationPreviewMod;
}
