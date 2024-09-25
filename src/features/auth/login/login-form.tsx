'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { Github } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { loginAction } from '@/features/auth/login/login-email-action';
import {
  LoginEmailValues,
  loginEmailSchema,
} from '@/features/auth/login/login-email-validation';
import { loginGithubAction } from '@/features/auth/login/login-github-action';

export const description =
  "A simple login form with username and password. The submit button says 'Sign in'.";

export const LoginForm = () => {
  const { form, handleSubmitWithAction, action } = useHookFormAction(
    loginAction,
    zodResolver(loginEmailSchema),
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

  const githubLogin = useAction(loginGithubAction);

  return (
    <Form {...form}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitWithAction} className="grid gap-4">
            <FormField<LoginEmailValues>
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
            <FormField<LoginEmailValues>
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
            <Button type="submit" isLoading={action.isExecuting}>
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardContent>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
        </CardContent>
        <CardContent>
          <Button
            variant="outline"
            isLoading={
              githubLogin.isExecuting || githubLogin.status === 'hasSucceeded'
            }
            icon={Github}
            className="w-full"
            onClick={githubLogin.execute.bind(null, void 0)}
          >
            GitHub
          </Button>
        </CardContent>
      </Card>
    </Form>
  );
};
