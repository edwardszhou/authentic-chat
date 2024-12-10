import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

const ChatContext = createContext<{
  webcamEnabled: boolean;
  setWebcamEnabled: Dispatch<SetStateAction<boolean>>;
  faceApiLoaded: boolean;
  setFaceApiLoaded: Dispatch<SetStateAction<boolean>>;
}>({
  webcamEnabled: false,
  setWebcamEnabled: () => {},
  faceApiLoaded: false,
  setFaceApiLoaded: () => {}
});

export function ChatProvider({ children }: { children: ReactNode }) {
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [faceApiLoaded, setFaceApiLoaded] = useState(false);

  return (
    <ChatContext.Provider
      value={{ webcamEnabled, setWebcamEnabled, faceApiLoaded, setFaceApiLoaded }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContext;
