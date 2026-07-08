export type Conversation = {
  id: number;
  title: string;
  createdAT: string;
};

export type ConvoInit = {
  title: string;
  createdAT: string;
  members: number[];
};
