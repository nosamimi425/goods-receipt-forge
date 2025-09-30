import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const video = document.getElementById("splash-video") as HTMLVideoElement;
    
    const handleVideoEnd = () => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    };

    if (video) {
      video.addEventListener("ended", handleVideoEnd);
      return () => video.removeEventListener("ended", handleVideoEnd);
    }
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background animate-in fade-in">
      <video
        id="splash-video"
        autoPlay
        muted
        playsInline
        className="max-w-full max-h-full"
      >
        <source src="/logo-animation.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
