import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ConversationPreview } from '../../../models/conversation';
import { interval, Subscription } from 'rxjs';
import { Conversation } from '../../../services/conversation';

@Component({
  selector: 'app-conversation-list',
  imports: [],
  templateUrl: './conversation-list.html',
  styleUrl: './conversation-list.scss',
})
export class ConversationList implements OnInit, OnDestroy {
  conversations = signal<ConversationPreview[]>([]);

  private pollingSubscription?: Subscription;

  constructor(private conversationService: Conversation) {}

  ngOnInit() {
    // Get conversations immediately
    this.loadThumbNail();

    // Get them again every 5 seconds
    this.pollingSubscription = interval(5000).subscribe(() => {
      this.loadThumbNail();
    });
  }

  loadThumbNail() {
    this.conversationService.getThumbNail().subscribe((data) => {
      console.log('Data received:', data);

      this.conversations.set(data);

      console.log('Conversations now:', this.conversations());
    });
  }

  ngOnDestroy() {
    this.pollingSubscription?.unsubscribe();
  }
}
