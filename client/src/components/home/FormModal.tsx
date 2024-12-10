import LoginForm from '@/components/auth/LoginForm';
import SignUpForm from '@/components/auth/SignupForm';
import { cn } from '@/lib/utils';

export default function FormModal({
  modalOpen,
  setModalOpen,
  modalContent,
  setModalContent
}: {
  modalOpen: boolean;
  setModalOpen: (state: boolean) => void;
  modalContent: 'login' | 'signup';
  setModalContent: (state: 'login' | 'signup') => void;
}) {
  return (
    <div
      className={cn(
        'fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/20 opacity-100 backdrop-blur-sm transition-opacity duration-200',
        { 'pointer-events-none opacity-0': !modalOpen }
      )}
      onClick={() => {
        setModalOpen(false);
      }}
    >
      <div
        className={cn(
          'h-[42rem] w-[34rem] translate-y-6 overflow-hidden rounded-3xl bg-white shadow-2xl transition-transform duration-500',
          { 'translate-y-0': modalOpen }
        )}
        onClick={(ev) => ev.stopPropagation()}
      >
        <LoginForm
          className={cn('absolute inset-0 -translate-x-full transition-transform duration-200', {
            'translate-x-0': modalContent === 'login'
          })}
        />
        <SignUpForm
          className={cn('absolute inset-0 translate-x-0 transition-transform duration-200', {
            'translate-x-full': modalContent === 'login'
          })}
        />
      </div>
    </div>
  );
}
