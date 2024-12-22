import useAuth from '@/hooks/useAuth';
import axios from '@/lib/axios';
import { apiRoutes } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const SignupFormSchema = z
  .object({
    username: z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username contains invalid characters.' })
      .min(3, { message: 'Username must be between 3 and 24 characters long.' })
      .max(24, { message: 'Username must be between 3 and 24 characters long.' }),
    password: z
      .string()
      .regex(/^(?=.*[0-9])(?=.*[a-zA-Z]).+$/, {
        message: 'Password must contain a letter and a number.'
      })
      .min(8, { message: 'Password must be between 8 and 32 characters long.' })
      .max(32, {}),
    confirm: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match.',
    path: ['confirm']
  });
type SignupFormValues = z.infer<typeof SignupFormSchema>;

function SignUpForm({ className }: { className?: string }) {
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/messages';

  const { formState, handleSubmit, register, watch, setError } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema),
    mode: 'onTouched'
  });

  const errorMessage =
    formState.errors.root?.serverError?.message ??
    formState.errors.username?.message ??
    formState.errors.password?.message ??
    formState.errors.confirm?.message;

  const onSubmit = async (formData: SignupFormValues) => {
    try {
      await axios.post(apiRoutes.users, JSON.stringify(formData), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
    } catch (err) {
      if (!err || !(err as AxiosError).response) {
        setError('root.serverError', {
          type: '500',
          message: 'No server response.'
        });
      } else {
        setError('username', {
          type: '409',
          message: 'Username is already taken, please try another.'
        });
      }
      return;
    }

    try {
      const response = await axios.post(apiRoutes.auth, JSON.stringify(formData), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      const accessToken = response?.data?.accessToken;
      setAuthToken(accessToken);
      navigate(from, { replace: true });
    } catch (err) {
      if (!(err as AxiosError)?.response) {
        setError('root.serverError', {
          type: '500',
          message: 'No server response.'
        });
      } else {
        setError('root.serverError', {
          type: '400',
          message: 'Account created, but login failed. Please try again later.'
        });
      }
    }
  };

  return (
    <div className={cn('flex max-w-full flex-col gap-16 p-16', className)}>
      <h1 className="text-7xl font-medium text-primary">Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-4"
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
          <input
            placeholder="Confirm password"
            className="w-full rounded-2xl bg-grayscale-20 px-6 py-3 text-xl"
            type="password"
            {...register('confirm')}
          />
          <div className="flex gap-2">
            <input
              placeholder="First name"
              className="w-full rounded-2xl bg-grayscale-20 px-6 py-3 text-xl"
              {...register('firstName')}
            />
            <input
              placeholder="Last name"
              className="w-full rounded-2xl bg-grayscale-20 px-6 py-3 text-xl"
              {...register('lastName')}
            />
          </div>
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
            Sign Up
          </button>
          <Link to="/sign-up">
            <button
              type="button"
              className="rounded-sm border-2 border-white bg-white py-1 text-xl font-medium text-primary-dark transition-colors hover:border-b-primary-dark"
            >
              Go to login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
