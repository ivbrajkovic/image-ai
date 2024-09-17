import { cookies } from 'next/headers';
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';
import { z } from 'zod';

const getUserIdFromSessionId = async (_session: string) => {
  return 'userId';
};

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
    const session = cookies().get('session')?.value;
    if (!session) throw new Error('Session not found!');

    const userId = await getUserIdFromSessionId(session);
    if (!userId) throw new Error('Session is not valid!');

    // Return the next middleware with `userId` value in the context
    return next({ ctx: { userId } });
  });
