import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, KeycloakConnectModule } from 'nest-keycloak-connect';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, KeycloakConnectModule.register({
    authServerUrl: 'http://localhost:8090',
    realm: 'constrsw',
    clientId: 'oauth',
    secret: '04bfUatIDO6ipwg1TF2mTzHrX8UZD02Z',
  })],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    } 
  ]
})
export class AppModule {}
