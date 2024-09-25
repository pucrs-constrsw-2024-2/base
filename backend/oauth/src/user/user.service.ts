import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(authentication_header: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get('/admin/realms/constrsw/users', {
          headers: {
            Authorization: authentication_header,
          },
          withCredentials: true,
        }),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response.data.errorMessage,
        error.response.status,
      );
    }
  }

  async findOne(id: number, authentication_header: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`/admin/realms/constrsw/users/${id}`, {
          headers: {
            Authorization: authentication_header,
          },
          withCredentials: true,
        }),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response.data.errorMessage,
        error.response.status,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async changePassword(
    id: string,
    password: string,
    authentication_header: string,
  ): Promise<void> {
    const teste = await firstValueFrom(
      this.httpService
        .put(
          `/admin/realms/constrsw/users/${id}/reset-password`,
          {
            type: 'password',
            value: password,
            temporary: false,
          },
          {
            headers: {
              Authorization: authentication_header,
            },
            withCredentials: true,
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error);
            throw Error(error.code);
          }),
        ),
    );
    console.log({ teste });
  }
}
