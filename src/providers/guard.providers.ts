import { AuthGuard } from 'src/module/auth/auth.guard';

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const GuardProvider = [
  {
    provide: 'APP_GUARD',
    useClass: AuthGuard,
  },
];
