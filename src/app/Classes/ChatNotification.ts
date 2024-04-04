import { ChatAttachmentNotication } from "./ChatAttachmentNotication";

export class ChatNotification {
    public id: number;
    public senderId: number;
    public senderName: string;
    public receiverId: number;
    public receiverName: string;
    public message: string;
    public attachments: ChatAttachmentNotication[];
  
    constructor(
      id: number,
      senderId: number,
      senderName: string,
      receiverId: number,
      receiverName: string,
      message: string,
      attachments: ChatAttachmentNotication[]
    ) {
      this.id = id;
      this.senderId = senderId;
      this.senderName = senderName;
      this.receiverId = receiverId;
      this.receiverName = receiverName;
      this.message = message;
      this.attachments = attachments;
    }
  }