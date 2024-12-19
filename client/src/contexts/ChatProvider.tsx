import type { FaceDetectionHandle } from '@/components/webcam/Webcam';
import FaceDetection from '@/components/webcam/Webcam';
import type { FaceExpressions } from 'face-api.js';
import { createContext, useCallback, useRef, useState, type ReactNode } from 'react';

const ChatContext = createContext<{
  webcamEnabled: boolean;
  faceApiLoaded: boolean;
  startWebcam: () => void;
  getFaceEmotion: () => Promise<FaceExpressions | undefined> | void;
}>({
  webcamEnabled: false,
  faceApiLoaded: false,
  startWebcam: () => {},
  getFaceEmotion: () => {}
});

export function ChatProvider({ children }: { children: ReactNode }) {
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [faceApiLoaded, setFaceApiLoaded] = useState(false);
  const faceDetectionRef = useRef<FaceDetectionHandle>(null);

  const startWebcam = useCallback(() => {
    if (faceDetectionRef.current) faceDetectionRef.current.startWebcam();
  }, []);

  const getFaceEmotion = useCallback(async () => {
    return await faceDetectionRef.current?.getEmotion();
  }, []);

  return (
    <>
      <ChatContext.Provider value={{ webcamEnabled, faceApiLoaded, startWebcam, getFaceEmotion }}>
        {children}
      </ChatContext.Provider>
      <FaceDetection
        ref={faceDetectionRef}
        setWebcamEnabled={setWebcamEnabled}
        setFaceApiLoaded={setFaceApiLoaded}
      />
    </>
  );
}

export default ChatContext;
