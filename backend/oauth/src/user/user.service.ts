import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(
    authentication_header: string,
    enabled?: boolean,
  ): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get('/admin/realms/constrsw/users', {
            headers: {
              Authorization: authentication_header,
            },
            params: enabled !== undefined ? { enabled } : {}, //  habilitados/desabilitados
          })
          .pipe(
            catchError((error) => {
              throw new HttpException(
                error.response?.data || 'Erro ao acessar Keycloak',
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }),
          ),
      );

      return response.data.map((user) => ({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        enabled: user.enabled,
      }));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'Erro ao acessar Keycloak',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string, authentication_header: string): Promise<any> {
    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService
          .get(`/users/${id}`, {
            headers: {
              Authorization: authentication_header,
            },
          })
          .pipe(
            catchError((error) => {
              throw new HttpException(
                error.response?.data || 'Erro ao acessar Keycloak',
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }),
          ),
      );

      const user = response.data;
      return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        enabled: user.enabled,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'Erro ao acessar Keycloak',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  private handleKeycloakError(error: any) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        throw new HttpException(
          'Access token inválido',
          HttpStatus.UNAUTHORIZED,
        );
      } else if (status === 403) {
        throw new HttpException(
          'Access token não concede permissão para acessar esse endpoint ou objeto',
          HttpStatus.FORBIDDEN,
        );
      } else if (status === 400) {
        throw new HttpException(
          'Erro na estrutura do request (headers, request body etc.)',
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(data, HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException(
        'Erro desconhecido',
        HttpStatus.INTERNAL_SERVER_ERROR,
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
