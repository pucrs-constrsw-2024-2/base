import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
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

  async changePassword(id: string, password: string): Promise<void> {
    this.httpService
      .put(
        `/realms/constrsw/users/${id}/reset-password`,
        {
          type: 'password',
          value: id,
          temporary: false,
        },
        {
          withCredentials: true,
        },
      )
      .pipe(
        catchError((error: AxiosError) => {
          throw error.response.data;
        }),
      );
    console.log(id, password);
  }
}
