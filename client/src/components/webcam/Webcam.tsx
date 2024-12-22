import { appErrors } from '@/lib/constants';
import * as faceapi from 'face-api.js';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

export interface FaceDetectionHandle {
  getEmotion: () => Promise<
    { error: string; expressions: null } | { error: null; expressions: faceapi.FaceExpressions }
  >;
  startWebcam: () => Promise<{ error: string | null }>;
  stopWebcam: () => void;
}

const FaceDetection = forwardRef<
  FaceDetectionHandle,
  { setFaceApiLoaded: (loaded: boolean) => void; setWebcamEnabled: (loaded: boolean) => void }
>(({ setFaceApiLoaded, setWebcamEnabled }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      async getEmotion() {
        if (!videoRef.current || !canvasRef.current)
          return { error: appErrors.mountError, expressions: null };
        const context = canvasRef.current.getContext('2d', { willReadFrequently: true });
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!context || !video.videoWidth || !video.videoHeight)
          return { error: appErrors.mountError, expressions: null };

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const detectionWithExpressions = await faceapi
          .detectSingleFace(canvasRef.current)
          .withFaceExpressions();
        if (!detectionWithExpressions) return { error: appErrors.faceHidden, expressions: null };

        return { error: null, expressions: detectionWithExpressions.expressions };
      },
      async startWebcam() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setMediaStream(stream);
          setWebcamEnabled(true);
        } catch (error) {
          return { error: appErrors.cameraError };
        }
        return { error: null };
      },
      stopWebcam() {
        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => {
            track.stop();
          });
          setMediaStream(null);
        }
      }
    }),
    [mediaStream, setWebcamEnabled]
  );

  useEffect(() => {
    Promise.all([
      faceapi.loadFaceExpressionModel('/models'),
      faceapi.loadSsdMobilenetv1Model('/models')
    ]).then(() => {
      setFaceApiLoaded(true);
      console.log('Face API loaded');
    });
  }, [setFaceApiLoaded]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 scale-0 opacity-0">
      <video
        autoPlay
        width={640}
        height={480}
        muted
        ref={videoRef}
      />
      <canvas
        hidden
        ref={canvasRef}
      />
    </div>
  );
});

FaceDetection.displayName = 'FaceDetection';
export default FaceDetection;
