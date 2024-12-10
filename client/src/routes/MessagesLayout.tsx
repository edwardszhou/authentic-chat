import type { FaceDetectionHandle } from '@/components/webcam/Webcam';
import FaceDetection from '@/components/webcam/Webcam';
import useAuth from '@/hooks/useAuth';
import { useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function MessagesLayout() {
  const { auth } = useAuth();
  const faceDetectionRef = useRef<FaceDetectionHandle>(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [faceApiLoaded, setFaceApiLoaded] = useState(false);

  return (
    <>
      <main className="flex h-screen max-h-screen w-screen max-w-full gap-8 overflow-hidden bg-grayscale-20 p-8">
        <aside className="h-full w-0 rounded-2xl bg-white p-8 shadow-lg lg:w-[30rem]">
          {auth?.username}
          <br /> {`${auth?.firstName} ${auth?.lastName}`}
        </aside>
        <Outlet />
      </main>
      <FaceDetection
        ref={faceDetectionRef}
        setWebcamEnabled={setWebcamEnabled}
        setFaceApiLoaded={setFaceApiLoaded}
      />
    </>
  );
}
