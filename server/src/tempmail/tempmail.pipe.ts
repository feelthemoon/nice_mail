import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class TempmailPipe implements PipeTransform {
  constructor(private readonly jwtService: JwtService) {}
  transform(socket: Socket) {
    if (socket && socket.handshake) {
      try {
        this.jwtService.verify(socket.handshake.auth.mailToken);
        socket.handshake.auth.email = this.jwtService.decode(socket.handshake.auth.mailToken, {
          json: true,
        })['mail'][0];
        return socket;
      } catch (e) {
        socket.emit('CLIENT:ERROR:GET_MESSAGES', 'Your email was expired! Try to reload page.');
      }
    }
  }
}
