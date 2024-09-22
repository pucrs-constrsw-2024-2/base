import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}
  create(createUserDto: CreateUserDto) {
    this.httpService
      .post(
        '/realms/constrsw/users',
        {
          username: createUserDto.username,
          email: createUserDto.email,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          enabled: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      .pipe(
        catchError((error: AxiosError) => {
          throw error.response.data;
        }),
      );
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
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
