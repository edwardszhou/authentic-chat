import { socket } from '@/lib/socket';
import { useEffect, useRef, useState } from 'react';

export default function Messages() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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
      setMessages((previous) => [...previous, value]);
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
  return (
    <div className="h-full min-w-0 flex-1 rounded-2xl bg-white p-8 shadow-lg">
      Connected: {`${isConnected}`}
      <br />
      <div>
        Messages:
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      <input
        className="border border-black"
        ref={inputRef}
      />
      <button
        onClick={() => {
          if (inputRef.current?.value) socket.emit('message', inputRef.current.value);
        }}
      >
        Submit Message
      </button>
    </div>
  );
}
