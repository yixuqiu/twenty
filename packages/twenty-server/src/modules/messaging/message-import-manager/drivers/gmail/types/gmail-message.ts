export type GmailMessage = {
  historyId: string;
  externalId: string;
  headerMessageId: string;
  subject: string;
  messageThreadExternalId: string;
  internalDate: string;
  fromHandle: string;
  fromDisplayName: string;
  participants: Participant[];
  text: string;
  attachments: Attachment[];
};

export type Participant = {
  role: 'from' | 'to' | 'cc' | 'bcc';
  handle: string;
  displayName: string;
};

export type ParticipantWithMessageId = Participant & { messageId: string };

export type ParticipantWithId = Participant & {
  id: string;
};

export type Attachment = {
  id: string;
  filename: string;
  size: number;
  mimeType: string;
};
