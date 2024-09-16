import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [HttpModule.register({
    baseURL: "http://localhost:8090"
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
