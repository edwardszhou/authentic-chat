import * as faceapi from 'face-api.js';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

export interface FaceDetectionHandle {
  getEmotion: () => Promise<faceapi.FaceExpressions | undefined>;
  startWebcam: () => Promise<void>;
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
        if (!videoRef.current || !canvasRef.current) return;
        const context = canvasRef.current.getContext('2d');
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!context || !video.videoWidth || !video.videoHeight) return;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const detectionWithExpressions = await faceapi
          .detectSingleFace(canvasRef.current)
          .withFaceExpressions();
        if (detectionWithExpressions) return detectionWithExpressions.expressions;
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
          console.error('Error accessing webcam', error);
        }
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
  const startWebcam = async () => {
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
      console.error('Error accessing webcam', error);
    }
  };

  useEffect(() => {
    Promise.all([
      faceapi.loadFaceExpressionModel('/models'),
      faceapi.loadSsdMobilenetv1Model('/models')
    ]).then(() => {
      setFaceApiLoaded(true);
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
