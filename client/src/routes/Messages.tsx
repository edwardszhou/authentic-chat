import ChatContext from '@/contexts/ChatProvider';
import { socket } from '@/lib/socket';
import { cn } from '@/lib/utils';
import { ArrowUp } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';

type Message = {
  message: string;
  sender: string;
};

export default function Messages() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { startWebcam, getFaceEmotion, webcamEnabled, faceApiLoaded } = useContext(ChatContext);

  useEffect(() => {
    if (!webcamEnabled) startWebcam();
  }, [startWebcam, webcamEnabled]);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    function onConnect() {
      console.log('connected!');
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log('disconnected!');
      setIsConnected(false);
    }

    function onMessage(value: string) {
      setMessages((previous) => [...previous, { message: value, sender: 'Anonymous' }]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessage);
    };
  }, []);

  async function handleEnter() {
    if (inputRef.current) {
      const expressions = await getFaceEmotion();
      if (expressions) console.log(expressions);
      const message = inputRef.current.value;
      socket.emit('message', inputRef.current.value);
      setMessages((previous) => [...previous, { message, sender: 'You' }]);
      inputRef.current.value = '';
    }
  }

  return (
    <>
      <div className="flex h-full min-w-0 flex-1 flex-col rounded-2xl bg-white shadow-lg">
        <div className="border-b border-grayscale-40 px-8 py-4">Connected: {`${isConnected}`}</div>
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-8">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn('flex flex-col gap-0.5', { 'self-end': msg.sender === 'You' })}
            >
              <span
                className={cn('mx-2 w-fit text-xs font-light text-grayscale-40', {
                  'self-end': msg.sender === 'You'
                })}
              >
                {msg.sender}
              </span>
              <span
                className={cn('w-fit text-wrap rounded-xl bg-grayscale-20 px-4 py-1', {
                  'bg-primary text-white': msg.sender === 'You'
                })}
              >
                {msg.message}
              </span>
            </div>
          ))}
        </div>
        <div className="flex h-12 gap-4 p-2">
          <input
            className="flex-1 rounded-xl border border-grayscale-40 bg-grayscale-20 p-2"
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEnter();
            }}
          />
          <button
            onClick={handleEnter}
            disabled={!webcamEnabled || !faceApiLoaded}
            className="disabled:opacity-50"
          >
            <ArrowUp className="h-full w-full rounded-full bg-primary stroke-white stroke-[3px] p-1" />
          </button>
        </div>
      </div>
    </>
  );
}
