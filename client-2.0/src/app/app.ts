import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatPage } from './pages/chat-page/chat-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatPage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('client-2.0');
}
