import { Message } from "./message";

export interface conversationWithMessages {
    id: number;
    title: string | null;
    createdAT: string;
    messages: Message[];
}
