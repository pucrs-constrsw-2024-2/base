import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
@ApiTags('autenticação')
@UsePipes(ZodValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Autentica um usuário.',
    description: 'Autentica um usuário e retorna um token de acesso.',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário autenticado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na estrutura da chamada (headers, request body, etc).',
  })
  @ApiResponse({
    status: 401,
    description: 'username e/ou password inválidos.',
  })
  async login(@Body() body: LoginDto): Promise<void> {
    console.log({ body });
    return this.authService.login();
  }
}
