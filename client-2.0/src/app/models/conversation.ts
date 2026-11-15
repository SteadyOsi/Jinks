import { Message } from './message';

// Used for displaying the thumnails of chats on the side bar.
export type ConversationPreview = {
  id: number;
  title: string;
  createdAT: string;
  lastMessage: string | null;
  lastMessageAt: string | null;
};

export type ConversationDetails = {
  id: number;
  title: string | null;
  createdAT: string;
  messages: Message[];
};
