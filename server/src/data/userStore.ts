import { User } from "../types/User";

export const users: User[] = [];
export let nextUserId = 1;

export function incUserID() {
    nextUserId++;
}