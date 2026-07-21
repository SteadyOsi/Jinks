import { Message } from "./Message";

export type Conversation = {
        id: number;
        title: string;
        createdAT: string;
};

// full chat including all the messages in it
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

// used for prewviewing chat's before going into one
export type ConversationPreview = {
        id: number;
        title: string;
        createdAT: string;
        lastMessage: string;
}

