import type { FaceDetectionHandle } from '@/components/webcam/Webcam';
import FaceDetection from '@/components/webcam/Webcam';
import { appErrors } from '@/lib/constants';
import type { FaceExpressions } from 'face-api.js';
import { createContext, useCallback, useRef, useState, type ReactNode } from 'react';

const ChatContext = createContext<{
  webcamEnabled: boolean;
  faceApiLoaded: boolean;
  startWebcam: () => Promise<{ error: string | null }>;
  getFaceEmotion: () => Promise<
    { error: string; expressions: null } | { error: null; expressions: FaceExpressions }
  >;
}>({
  webcamEnabled: false,
  faceApiLoaded: false,
  startWebcam: async () => {
    return { error: appErrors.mountError };
  },
  getFaceEmotion: async () => {
    return { error: appErrors.mountError, expressions: null };
  }
});

export function ChatProvider({ children }: { children: ReactNode }) {
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [faceApiLoaded, setFaceApiLoaded] = useState(false);
  const faceDetectionRef = useRef<FaceDetectionHandle>(null);

  const startWebcam = useCallback(async () => {
    if (!faceDetectionRef.current) return { error: appErrors.mountError };
    else {
      return await faceDetectionRef.current.startWebcam();
    }
  }, []);

  const getFaceEmotion = useCallback(async () => {
    if (!faceDetectionRef.current) {
      return { error: appErrors.mountError, expressions: null };
    }
    return await faceDetectionRef.current.getEmotion();
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
