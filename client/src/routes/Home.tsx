import HoverBorder from "@/components/HoverBorder";
import Logo from "@/components/Logo";
import { CirclePlus, LockKeyholeIcon, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <>
      <nav className="bg-white/75 fixed flex h-28 w-full items-center justify-between gap-8 p-8 backdrop-blur-lg md:px-16 xl:px-32 2xl:px-48">
        <div
          id="hero"
          className="text-primary flex items-center gap-2 text-4xl font-bold tracking-tight"
        >
          <Logo className="h-12" />
          <span>
            Authenti<span className="">Chat</span>
          </span>
        </div>
        <div className="text-primary-dark text-md flex h-full items-center gap-8 pr-16 font-light md:gap-12 xl:gap-16">
          <HoverBorder
            borderColorClassName="border-primary"
            containerClassName="rounded"
          >
            <a className="text-primary active:bg-primary active:text-white block cursor-pointer select-none overflow-hidden text-nowrap rounded px-10 py-3 font-medium transition-colors focus:outline-none focus:ring md:px-6">
              How it works
            </a>
          </HoverBorder>
          <HoverBorder
            borderColorClassName="border-primary-dark"
            containerClassName="rounded"
          >
            <button className="text-primary-dark active:bg-primary-dark active:text-white block cursor-pointer overflow-hidden text-nowrap rounded px-10 py-3 font-medium transition-colors focus:outline-none focus:ring md:px-6">
              Sign up
            </button>
          </HoverBorder>
        </div>
      </nav>
      <main className="flex w-full max-w-full flex-col">
        <div className="h-28 w-full" />
        <div className="bg-primary-light mx-8 flex flex-wrap items-center justify-between gap-24 rounded-3xl p-32 md:px-36 xl:px-48">
          <div className="flex w-[40rem] flex-col items-start gap-8">
            <h1 className="text-primary-dark text-6xl font-black leading-[1.25] lg:text-6xl lg:leading-[1.25]">
              Rediscover <span className="bg-primary-dark text-white px-3">authenticity</span> in
              conversation
            </h1>
            <h3 className="text-black text-2xl font-light">
              Express how you truly feel with your friends and family, and they&apos;ll do the same.
              Embrace a new transparent texting experience.
            </h3>
            <div className="mt-16 flex flex-wrap gap-12">
              <button className="bg-primary-dark text-white hover:bg-white hover:text-primary-dark border-primary-dark rounded-lg border-2 px-8 py-4 text-lg font-medium transition-colors">
                Sign up today
              </button>
              <button className="bg-white hover:bg-primary-dark hover:text-white text-primary hover rounded-lg px-8 py-3 text-lg font-medium transition-colors">
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
            <h2 className="text-primary-dark text-5xl font-bold">What ensures authenticity?</h2>
            <h3 className="text-black text-2xl font-bold">
              Three methods of guarenteeing that each message is meaningful:
            </h3>
          </div>
          <div className="grid h-fit grid-cols-3 grid-rows-1 flex-nowrap items-stretch gap-8">
            <div className="bg-primary text-white flex h-full flex-col items-center gap-8 rounded-2xl p-16 shadow-xl transition-transform duration-300 hover:-translate-y-2">
              <CirclePlus
                className="text-primary-dark h-16 w-16"
                size={64}
              />
              <h4 className="text-center text-3xl font-bold">Authenticity Rating</h4>
              <p className="text-wrap text-lg">
                Each text message is given an authenticity score when sent based on the sentiment
                analysis of the message and the expression on the face of the sender.
              </p>
            </div>
            <div className="bg-primary text-white flex h-full flex-col items-center gap-8 rounded-2xl p-16 shadow-xl transition-transform duration-300 hover:-translate-y-2">
              <Sparkles
                className="text-primary-dark h-16 w-16"
                size={64}
              />
              <h4 className="text-center text-3xl font-bold">Reveal Authenticity</h4>
              <p className="text-wrap text-lg">
                Authentichat will analyze the content of the message and transform any inauthentic
                message to best represent the sentiment of the sender.
              </p>
            </div>
            <div className="bg-primary text-white flex h-full flex-col items-center gap-8 rounded-2xl p-16 shadow-xl transition-transform duration-300 hover:-translate-y-2">
              <LockKeyholeIcon
                className="text-primary-dark h-16 w-16"
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
      <footer className="bg-grayscale-20 flex h-20 w-full items-center justify-between px-32 text-grayscale-60">
        <h5 className="text-lg font-medium">AuthentiChat (2024)</h5>
        <a href="https://github.com/edwardszhou">Contact</a>
      </footer>
    </>
  );
}
