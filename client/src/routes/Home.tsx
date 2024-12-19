import FormModal from '@/components/home/FormModal';
import HoverBorder from '@/components/home/HoverBorder';
import Logo from '@/components/home/Logo';
import { CirclePlus, LockKeyholeIcon, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<'login' | 'signup'>('signup');

  return (
    <>
      <nav className="fixed flex h-28 w-full items-center justify-between gap-8 bg-white/75 p-8 backdrop-blur-lg md:px-16 xl:px-32 2xl:px-48">
        <div className="flex items-center gap-2 text-4xl font-bold tracking-tight text-primary">
          <Logo className="h-12" />
          <span>
            Authenti<span className="">Chat</span>
          </span>
        </div>
        <div className="text-md flex h-full items-center gap-8 pr-16 font-light text-primary-dark md:gap-12 xl:gap-16">
          <HoverBorder
            borderColorClassName="border-primary"
            containerClassName="rounded"
          >
            <a className="block cursor-pointer select-none overflow-hidden text-nowrap rounded px-10 py-3 font-medium text-primary transition-colors focus:outline-none focus:ring active:bg-primary active:text-white md:px-6">
              How it works
            </a>
          </HoverBorder>
          <HoverBorder
            borderColorClassName="border-primary-dark"
            containerClassName="rounded"
          >
            <button
              onClick={() => {
                setModalOpen(true);
                setModalContent('signup');
              }}
              className="block cursor-pointer overflow-hidden text-nowrap rounded px-10 py-3 font-medium text-primary-dark transition-colors focus:outline-none focus:ring active:bg-primary-dark active:text-white md:px-6"
            >
              Sign up
            </button>
          </HoverBorder>
        </div>
      </nav>
      <main className="flex w-full max-w-full flex-col">
        <div className="h-28 w-full" />
        <div className="mx-8 flex flex-wrap items-center justify-between gap-24 rounded-3xl bg-primary-light p-32 shadow-md md:px-36 xl:px-48">
          <div className="flex w-[40rem] flex-col items-start gap-8">
            <h1 className="text-6xl font-black leading-[1.25] text-primary-dark lg:text-6xl lg:leading-[1.25]">
              Rediscover <span className="bg-primary-dark px-3 text-white">authenticity</span> in
              conversation
            </h1>
            <h3 className="text-2xl font-light text-black">
              Express how you truly feel with your friends and family, and they&apos;ll do the same.
              Embrace a new transparent texting experience.
            </h3>
            <div className="mt-16 flex flex-wrap gap-12">
              <button
                onClick={() => {
                  setModalOpen(true);
                  setModalContent('signup');
                }}
                className="rounded-lg border-2 border-primary-dark bg-primary-dark px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-white hover:text-primary-dark"
              >
                Sign up today
              </button>
              <button
                onClick={() => {
                  setModalOpen(true);
                  setModalContent('login');
                }}
                className="hover rounded-lg bg-white px-8 py-3 text-lg font-medium text-primary transition-colors hover:bg-primary-dark hover:text-white"
              >
                Log in
              </button>
            </div>
          </div>
          <div className="min-w-24 flex-1">
            <Logo className="mx-auto w-full min-w-48 max-w-96" />
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-16 p-24 pb-32">
          <div className="flex flex-col gap-8 text-center">
            <h2 className="text-5xl font-bold text-primary-dark">What ensures authenticity?</h2>
            <h3 className="text-2xl font-bold text-black">
              Three methods of guarenteeing that each message is meaningful:
            </h3>
          </div>
          <div className="grid h-fit grid-cols-3 grid-rows-1 flex-nowrap items-stretch gap-8">
            <div className="flex h-full flex-col items-center gap-8 rounded-2xl bg-primary p-16 text-white shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <CirclePlus
                className="h-16 w-16 text-primary-dark"
                size={64}
              />
              <h4 className="text-center text-3xl font-bold">Authenticity Rating</h4>
              <p className="text-wrap text-lg">
                Each text message is given an authenticity score when sent based on the sentiment
                analysis of the message and the expression on the face of the sender.
              </p>
            </div>
            <div className="flex h-full flex-col items-center gap-8 rounded-2xl bg-primary p-16 text-white shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <Sparkles
                className="h-16 w-16 text-primary-dark"
                size={64}
              />
              <h4 className="text-center text-3xl font-bold">Reveal Authenticity</h4>
              <p className="text-wrap text-lg">
                Authentichat will analyze the content of the message and transform any inauthentic
                message to best represent the sentiment of the sender.
              </p>
            </div>
            <div className="flex h-full flex-col items-center gap-8 rounded-2xl bg-primary p-16 text-white shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <LockKeyholeIcon
                className="h-16 w-16 text-primary-dark"
                size={64}
              />
              <h4 className="text-center text-3xl font-bold">Ensure Authenticity</h4>
              <p className="text-wrap text-lg">
                If a text is detected as inauthentic or not consistent with your texting style,
                AuthentiChat will block the sending of that message.
              </p>
            </div>
          </div>
        </div>
      </main>
      <FormModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalContent={modalContent}
        setModalContent={setModalContent}
      />
      <footer className="flex h-20 w-full items-center justify-between bg-grayscale-20 px-32 text-grayscale-60">
        <h5 className="text-lg font-medium">AuthentiChat (2024)</h5>
        <a href="https://github.com/edwardszhou">Contact</a>
      </footer>
    </>
  );
}
