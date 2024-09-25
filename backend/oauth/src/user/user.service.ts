import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}
  async create(
    createUserDto: CreateUserDto,
    authentication_header: string,
  ): Promise<CreateUserDto> {
    try {
      await firstValueFrom(
        this.httpService.post(
          '/admin/realms/constrsw/users',
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
              Authorization: authentication_header,
            },
            withCredentials: true,
          },
        ),
      );
    } catch (error) {
      throw new HttpException(
        error.response.data.errorMessage,
        error.response.status,
      );
    }
    return createUserDto;
  }

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

  async remove(id: number, authentication_header: string) {
    try {
      await firstValueFrom(
        this.httpService.delete(`/admin/realms/constrsw/users/${id}`, {
          headers: {
            Authorization: authentication_header,
          },
          withCredentials: true,
        }),
      );
    } catch (error) {
      throw new HttpException(
        error.response.data.errorMessage,
        error.response.status,
      );
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    authentication_header: string,
  ) {
    try {
      await firstValueFrom(
        this.httpService.put(
          `/admin/realms/constrsw/users/${id}`,
          {
            username: updateUserDto.username,
            email: updateUserDto.email,
            firstName: updateUserDto.firstName,
            lastName: updateUserDto.lastName,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: authentication_header,
            },
            withCredentials: true,
          },
        ),
      );
    } catch (error) {
      throw new HttpException(
        error.response.data.errorMessage,
        error.response.status,
      );
    }
    return updateUserDto;
  }

  async changePassword(
    id: string,
    password: string,
    authentication_header: string,
  ): Promise<void> {
    try {
      await firstValueFrom(
        this.httpService.put(
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
        ),
      );
    } catch (error) {
      throw new HttpException(
        error.response.data.errorMessage,
        error.response.status,
      );
    }
  }
}
