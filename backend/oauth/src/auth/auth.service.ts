import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}
  async login(username: string, password: string): Promise<{accessToken: string}> {
      const { data } = await firstValueFrom(this.httpService.post<{accessToken: string}>("/realms/constrsw/protocol/openid-connect/token", {
        username,
        password,
        grant_type: "password",
        client_id: 'oauth',
        client_secret: '04bfUatIDO6ipwg1TF2mTzHrX8UZD02Z',
        scope: "openid"
      }, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
      }).pipe(catchError((error: AxiosError) => {
        throw error.response.data
      })))
      return data
    }
}
