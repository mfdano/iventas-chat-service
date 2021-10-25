export declare class OutgoingMessageDTO {
    id: string;
    chatId: string;
    senderId: string;
    content: string;
    sentDate: number;
    isFirst: boolean;
    constructor(id: string, chatId: string, senderId: string, content: string, sentDate: number, isFirst: boolean);
}
