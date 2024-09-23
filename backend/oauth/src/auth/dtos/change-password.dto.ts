import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

const ChangePasswordZ = z.object({
  password: z.string({ message: 'aaa' }).min(8).max(255).openapi({
    example: 'a12345678',
  }),
});

export class change_password_dto extends createZodDto(ChangePasswordZ) {}
