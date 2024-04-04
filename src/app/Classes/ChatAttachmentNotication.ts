export class ChatAttachmentNotication {
    public id: number;
    public mediaType: string;
    public name: string;
    public attachmentUrl: string;
    public chatId: number;
  
    constructor(
      id: number,
      mediaType: string,
      name: string,
      attachmentUrl: string,
      chatId: number
    ) {
      this.id = id;
      this.mediaType = mediaType;
      this.name = name;
      this.attachmentUrl = attachmentUrl;
      this.chatId = chatId;
    }
  }
  