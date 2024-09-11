import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login(): Promise<void> {
    console.log('login');
  }
}
