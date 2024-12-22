import useAuth from '@/hooks/useAuth';
import axios from '@/lib/axios';
import { apiRoutes } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { AxiosError } from 'axios';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const LoginFormSchema = z.object({
  username: z.string(),
  password: z.string()
});

type LoginFormValues = z.infer<typeof LoginFormSchema>;

export default function LoginForm({ className }: { className?: string }) {
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/messages';

  const { formState, handleSubmit, register, setError, setFocus, resetField } =
    useForm<LoginFormValues>({
      resolver: zodResolver(LoginFormSchema),
      defaultValues: { username: '', password: '' }
    });

  // Set focus on username input when component loads;
  useEffect(() => {
    setFocus('username');
  }, [setFocus]);

  const errorMessage =
    formState.errors.root?.serverError?.message ??
    formState.errors.username?.message ??
    formState.errors.password?.message;

  const onSubmit = async (formData: LoginFormValues) => {
    const { username, password } = formData;

    try {
      const response = await axios.post(apiRoutes.auth, JSON.stringify({ username, password }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      const accessToken = response?.data?.accessToken;
      setAuthToken(accessToken);
      navigate(from, { replace: true });
    } catch (err) {
      if (!(err as AxiosError).response) {
        setError('root.serverError', {
          type: '500',
          message: 'No server response.'
        });
      } else {
        setError('root.serverError', {
          type: '400',
          message: 'Login failed. Unrecognized username and password combination.'
        });
      }
      resetField('password');
    }
  };

  return (
    <div className={cn('flex max-w-full flex-col gap-16 p-16', className)}>
      <h1 className="text-7xl font-medium text-primary">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
      >
        <div className="flex w-full flex-1 flex-col gap-4">
          <input
            placeholder="Username"
            className="w-full rounded-2xl bg-grayscale-20 px-6 py-3 text-xl"
            {...register('username', {
              required: {
                value: true,
                message: 'Username is a required field.'
              }
            })}
          />
          <input
            placeholder="Password"
            className="w-full rounded-2xl bg-grayscale-20 px-6 py-3 text-xl"
            type="password"
            {...register('password', {
              required: {
                value: true,
                message: 'Password is a required field.'
              }
            })}
          />
          <p
            className="h-12 w-3/4 min-w-32 self-end text-right text-destructive"
            aria-live="assertive"
            tabIndex={-1}
          >
            {errorMessage}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-12">
          <button
            type="submit"
            className="rounded-lg bg-primary-dark px-6 py-3 text-xl font-medium text-white transition-colors hover:bg-primary"
          >
            Log In
          </button>
          <Link to="/sign-up">
            <button
              type="button"
              className="rounded-sm border-2 border-white bg-white py-1 text-xl font-medium text-primary-dark transition-colors hover:border-b-primary-dark"
            >
              Create an account
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
