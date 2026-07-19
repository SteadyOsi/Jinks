import { Message } from './message';

export interface ConversationWithMessages {
  id: number;
  title: string | null;
  createdAT: string;
  messages: Message[];
}
