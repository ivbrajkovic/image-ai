'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginAction } from '@/features/auth/login/login-action';
import {
  LoginValues,
  loginSchema,
} from '@/features/auth/login/login-validation';

export const description =
  "A simple login form with username and password. The submit button says 'Sign in'.";

export const LoginForm = () => {
  const { form, handleSubmitWithAction, action } = useHookFormAction(
    loginAction,
    zodResolver(loginSchema),
    {
      actionProps: {
        onError: (error) => {
          // TODO: Show toast with error message
          console.error('error', error);
        },
      },
      formProps: {
        defaultValues: {
          email: '',
          password: '',
        },
      },
    },
  );

  return (
    <Form {...form}>
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmitWithAction}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email and password to sign in
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField<LoginValues>
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField<LoginValues>
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              isLoading={action.isExecuting}
              className="w-full"
            >
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Form>
  );
};
