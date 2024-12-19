import ChatContext from '@/contexts/ChatProvider';
import { cn } from '@/lib/utils';
import { useContext, useState } from 'react';

export default function WebcamPopup() {
  const { startWebcam, webcamEnabled } = useContext(ChatContext);
  const [loading, setLoading] = useState(false);

  const requestWebcam = async () => {
    setLoading(true);
    await startWebcam();
    setLoading(false);
  };

  console.log(loading);
  return (
    <div
      className={cn(
        'absolute inset-0 flex items-center justify-center bg-primary/50 backdrop-blur-sm transition-opacity duration-300',
        { 'pointer-events-none opacity-0': webcamEnabled }
      )}
    >
      <div className="flex flex-col items-center gap-4 rounded-xl bg-grayscale-0 p-6">
        <h1 className="text-2xl font-bold text-primary-dark">Enable your webcam to access app</h1>
        <h3 className="text-center text-sm font-light text-black">
          We use your webcam data to uphold authenticity standards!
          <br />
          Webcam images are not shared with anyone, including us.
        </h3>
        <button
          className="text-md mt-6 rounded-lg bg-primary-dark px-6 py-3 text-white transition-colors hover:bg-primary disabled:pointer-events-none disabled:opacity-50"
          onClick={requestWebcam}
          disabled={loading}
        >
          Start Camera
        </button>
      </div>
    </div>
  );
}
