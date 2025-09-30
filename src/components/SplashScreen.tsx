import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const completedRef = useRef(false);

  const handleComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsFadingOut(true);
    setTimeout(onComplete, 200);
  };

  const handleSkip = () => {
    const video = document.getElementById("splash-video") as HTMLVideoElement;
    if (video) {
      video.pause();
    }
    handleComplete();
  };

  useEffect(() => {
    const video = document.getElementById("splash-video") as HTMLVideoElement;
    
    const handleVideoEnd = () => {
      handleComplete();
    };

    const handleError = () => {
      console.error("Video failed to load");
      handleComplete(); // Skip splash if video fails
    };

    if (video) {
      video.addEventListener("ended", handleVideoEnd);
      video.addEventListener("error", handleError);
      
      // Force play if autoplay fails
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay failed:", error);
          // Video will still show, user can click skip
        });
      }

      return () => {
        video.removeEventListener("ended", handleVideoEnd);
        video.removeEventListener("error", handleError);
      };
    }
  }, []);

  // Fallback: ensure splash never exceeds MAX_DURATION
  useEffect(() => {
    const MAX_DURATION = 1500; // 1.5s cap
    const t = setTimeout(() => handleComplete(), MAX_DURATION);
    return () => clearTimeout(t);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100 animate-in fade-in"
      }`}
    >
      <video
        id="splash-video"
        autoPlay
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        className="max-w-full max-h-full transition-transform duration-300"
      >
        <source src="/logo-animation.mp4" type="video/mp4" />
      </video>
      
      <Button
        onClick={handleSkip}
        variant="ghost"
        className="absolute bottom-8 right-8 opacity-70 hover:opacity-100 transition-opacity"
      >
        تخطي
      </Button>
    </div>
  );
};
