import { cookies } from 'next/headers';
import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

const getUserIdFromSessionId = async (_session: string) => {
  return 'userId';
};

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
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
