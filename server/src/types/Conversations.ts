import { Message } from "./Message";

export type Conversation = {
        id: number;
        title: string;
        createdAT: string;
};

export type ConversationDetails = {
        id: number;
        title: string | null;
        createdAT: string;
        messages: Message[];
}

export type ConvoInit = {
        title: string;
        createdAT: string;
        members: number[];
};
