import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

const LoginZ = z.object({
  username: z.string().min(3).max(255).openapi({
    example: 'admin@pucrs.br',
  }),
  password: z.string().min(8).max(255).openapi({
    example: 'a12345678',
  }),
});

export class LoginDto extends createZodDto(LoginZ) {}
