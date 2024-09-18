import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';
import { z } from 'zod';

import { checkUser } from '@/server/check-user';

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({ actionName: z.string() });
  },
  handleServerError(e) {
    console.error('Action error:', e.message);
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authActionClient = actionClient //
  .use(async ({ next }) => {
    const user = await checkUser();
    return next({ ctx: { user } });
  });
