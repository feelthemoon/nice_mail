import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UsePipes } from '@nestjs/common';
import { TempmailService } from '../tempmail.service';
import { TempmailSocketPipe } from './tempmail.socket.pipe';

@WebSocketGateway({ port: 80, cors: true })
export class TempmailGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly tempmailService: TempmailService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MessageGateway');

  @UsePipes(TempmailSocketPipe)
  @SubscribeMessage('CLIENT:GET_MESSAGES')
  async handleGetMessages(client: Socket) {
    try {
      const messages = await this.tempmailService.getMessages(client.handshake.auth.email);
      this.server.to(client?.id).emit('SERVER:GET_MESSAGES', messages);
    } catch (e) {
      this.server.to(client?.id).emit('SERVER:ERROR:GET_MESSAGES', 'Server Error');
    }
  }

  afterInit(server: Server) {
    this.logger.log(`Init server: ${server.sockets.allSockets()}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
