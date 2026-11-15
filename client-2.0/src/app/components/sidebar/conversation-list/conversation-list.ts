import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ConversationPreview } from '../../../models/conversation';
import { interval, Subscription } from 'rxjs';
import { Conversation } from '../../../services/conversation';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-conversation-list',
  imports: [DatePipe],
  templateUrl: './conversation-list.html',
  styleUrl: './conversation-list.scss',
})
export class ConversationList implements OnInit, OnDestroy {
  conversations = signal<ConversationPreview[]>([]);

  private pollingSubscription?: Subscription;

  constructor(private conversationService: Conversation) {}

  @Output() conversationSelected = new EventEmitter<number>();

  // Send the selected conversation ID up to the page component.
  selectConversation(id: number) {
    console.log('Selected conversation from thumnails:', id);
    this.conversationSelected.emit(id);
  }

  ngOnInit() {
    // Get conversations immediately
    this.loadThumbNail();

    // Get them again every 5 seconds
    this.pollingSubscription = interval(5000).subscribe(() => {
      this.loadThumbNail();
    });
  }

  loadThumbNail() {
    // Refresh the sidebar from the server so preview text and times stay current.
    this.conversationService.getThumbNail().subscribe((data) => {
      console.log('Data received:', data);

      this.conversations.set(data);

      console.log('Conversations now:', this.conversations());
    });
  }

  ngOnDestroy() {
    // Stop the periodic refresh when this component is removed.
    this.pollingSubscription?.unsubscribe();
  }
}
