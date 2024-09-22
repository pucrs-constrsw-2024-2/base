import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://localhost:8090',
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
