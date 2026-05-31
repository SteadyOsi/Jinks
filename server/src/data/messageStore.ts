import { Message } from "../types/Message";

export const messages: Message[] = [];
export let nextId = 1;

export function incID() {
    nextId++;
}