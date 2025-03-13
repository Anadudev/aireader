import { Request } from 'express';
import { User } from '@prisma/client';

export type ExtendedRequest = Request & {
  user?: User;
};
