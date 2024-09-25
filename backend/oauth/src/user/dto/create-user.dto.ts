import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

const CreateUserDtoZ = z.object({
  username: z.string().min(3).max(255).openapi({
    example: 'admin',
    description: 'Nome de usuario',
  }),
  email: z.string().email().openapi({
    example: 'admin@admin.pucrs.br',
    description: 'Email do usuario',
  }),
  firstName: z.string().min(3).max(255).openapi({
    example: 'Admin',
    description: 'Primeiro nome do usuario',
  }),
  lastName: z.string().min(3).max(255).openapi({
    example: 'Admin',
    description: 'Ultimo nome do usuario',
  }),
});

export class CreateUserDto extends createZodDto(CreateUserDtoZ) {}
