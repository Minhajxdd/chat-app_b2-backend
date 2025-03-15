import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ChatService } from "../Services/chat.service";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
    namespace: 'chat',
    cors: {
        origin: ['http://localhost:4200'],
        credentials: true,
    }
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

    @WebSocketServer()
    server: Server;
  
    constructor(
        private _chatService: ChatService
    ) {}
  
    private logger: Logger = new Logger('Chat Gateway');

    afterInit() {
        this.logger.log('Initilalized');
        this._chatService.setServer(this.server);
      }
    
      handleDisconnect(client: Socket) {
        // this._chatService.disconnect(client);

        this.logger.log(`Client Disconnected: ${client.id}`);
      }
    
      handleConnection(client: Socket) {
        this.logger.log(`Client Connected: ${client.id}`);
      }
}