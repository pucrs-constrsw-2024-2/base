import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { change_password_dto } from 'src/auth/dtos/change-password.dto';
import { LoggedUser } from 'src/entities/logged-user';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria um novo usuário.',
    description: 'Cria um novo usuário.',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao criar usuário.',
  })
  create(
    @Body() createUserDto: CreateUserDto,
    @Headers('authorization') headers: string,
  ) {
    return this.userService.create(createUserDto, headers);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualiza um usuário.',
    description: 'Atualiza um usuário.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao atualizar usuário.',
  })
  update(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
    @Headers('authorization') headers: string,
  ) {
    return this.userService.update(id, body, headers);
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
