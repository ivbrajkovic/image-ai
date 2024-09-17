'use server';

import { actionClient } from '@/lib/safe-action';
import { Auth } from '@/services/auth-service';
import { loginSchema } from '@/services/auth-service/auth-validation';

export const loginAction = actionClient
  .metadata({ actionName: 'login' })
  .schema(loginSchema)
  .action(({ parsedInput }) => {
    console.log('parsedInput', parsedInput);
    return Auth.instance.login(parsedInput);
  });
