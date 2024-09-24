import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { change_password_dto } from 'src/auth/dtos/change-password.dto';
import { LoggedUser } from 'src/entities/logged-user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Headers('Authorization') headers: string,
    @Query('enabled') enabled?: boolean,
  ): Promise<any> {
    Logger.log(`Authorization Header: ${headers}`, 'UserController');
    if (!headers) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = headers.split(' ')[1];
    if (!accessToken) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    try {
      // O método findAll do service retorna os usuários
      return await this.userService.findAll(accessToken, enabled);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('authorization') headers: string,
  ): Promise<any> {
    console.log('Authorization Header:', headers);
    if (!headers) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    try {
      // O método findOne do service retorna um usuário
      return await this.userService.findOne(id, headers);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':id')
  @ApiOperation({
    summary: 'Altera a senha do usuário logado.',
    description: 'Altera a senha do usuário logado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Senha alterada com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na estrutura da chamada (headers, request body, etc).',
  })
  async change_password(
    @Body() body: change_password_dto,
    @Param('id') id: string,
    @AuthenticatedUser() user: LoggedUser,
    @Headers('authorization') headers: string,
  ): Promise<void> {
    await this.userService.changePassword(id, body.password, headers);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
