import { useEffect, useRef, useState } from "react";

const MEDIA_BASE_URL = "https://media.gregjoblove.com";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const interpolate = (
  t: number,
  [a, b]: [number, number],
  [min, max]: [number, number],
) => {
  const clamped = clamp((t - a) / (b - a), 0, 1);
  return min + clamped * (max - min);
};

interface HeroProps {
  shouldHide?: boolean;
  onProgress?: (progress: number) => void;
  reelRef?: React.RefObject<HTMLVideoElement | null>;
}

const Hero: React.FC<HeroProps> = ({
  shouldHide = false,
  onProgress,
  reelRef,
}) => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [containerOffsetY, setContainerOffsetY] = useState(() =>
    Math.max(0, window.innerHeight * 0.4 - 40),
  );
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const yourName = "GREG JOBLOVE";

  const [spacerHeight, setSpacerHeight] = useState(0);

  useEffect(() => {
    const updateSpacer = () => {
      setSpacerHeight(window.innerHeight * 0.5 + 40);
    };
    updateSpacer();
    window.addEventListener("resize", updateSpacer);
    return () => window.removeEventListener("resize", updateSpacer);
  }, []);

  useEffect(() => {
    // Wait one animation frame for layout + transform to apply
    requestAnimationFrame(() => setReady(true));
  }, []);

  useEffect(() => {
    const element = heroRef.current;
    if (!element) return;

    const heroStart = element.offsetTop;
    const getHeroHeight = () => element.offsetHeight || window.innerHeight;

    // Distance the container travels before sticking (40vh natural pos − 40px sticky top)
    const getStickyRange = () => Math.max(0, window.innerHeight * 0.4 - 40);

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rawProgress = clamp(
            (window.scrollY - heroStart) / (getHeroHeight() * 0.5),
            0,
            1,
          );
          setScrollProgress(rawProgress);
          setVideoOpacity(clamp(1 - rawProgress * 1.2, 0, 1));
          setContainerOffsetY(Math.max(0, getStickyRange() - window.scrollY));
          // Sync overlay dot pattern with page background
          if (overlayRef.current) {
            overlayRef.current.style.backgroundPosition = `0px ${-window.scrollY}px, 0 0`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initialize on mount to ensure alignment at initial scroll position
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track viewport height and mobile state for responsive translate calculations
  useEffect(() => {
    const update = () => {
      setViewportHeight(window.innerHeight || 0);
      setIsMobile(window.innerWidth < 768);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Direct mapping: no easing
  const progress = scrollProgress;

  useEffect(() => {
    onProgress?.(progress);
  }, [progress, onProgress]);

  // Interpolations
  const titleScale = interpolate(progress, [0, 0.6], [1, 0.7]);
  const subtitleScale = interpolate(progress, [0.2, 0.8], [1, 0.7]);
  const subtitleTranslateY = interpolate(
    progress,
    [0.4, 0.8],
    [0, isMobile ? -15 : -25],
  );

  const socialTranslateStart = Math.max(0, viewportHeight * 0.6 - 280);
  const socialTranslateEnd = isMobile ? -15 : -25;
  const socialTranslateY = interpolate(
    progress,
    [0.4, 0.8],
    [socialTranslateStart, socialTranslateEnd],
  );

  const reelTranslateStart = Math.max(0, viewportHeight * 0.5);
  const reelTranslateEnd = 0;
  const reelTranslateY = interpolate(
    progress,
    [0.5, isMobile ? 0.85 : 1.0],
    [reelTranslateStart, reelTranslateEnd],
  );

  const colorValue = Math.round(interpolate(progress, [0, 1], [255, 0]));

  return (
    <>
      {/* Hero Video */}
      <div
        ref={heroRef}
        className="hero-sticky"
        style={{
          opacity: videoOpacity,
          pointerEvents: videoOpacity <= 0.02 ? "none" : "auto",
        }}
      >
        <video className="video-hero__video" autoPlay muted loop playsInline>
          <source
            src={`${MEDIA_BASE_URL}/reels/2025_Website-Bumper.webm`}
            type="video/webm"
          />
          Your browser does not support the video tag.
        </video>
        <div ref={overlayRef} className="video-hero__overlay"></div>
        <div
          className="scroll-indicator"
          style={{
            opacity: interpolate(progress, [0, 0.15], [1, 0]),
            pointerEvents: "none",
          }}
        >
          <svg
            width="22"
            height="12"
            viewBox="0 0 22 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 2L11 10L20 2" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Title / Subtitle */}
      <div
        className="hero-title-container"
        style={{
          opacity: shouldHide ? 0 : 1,
          pointerEvents: shouldHide ? "none" : "auto",
          transform: `translateY(${containerOffsetY}px)`,
          transition: "none",
        }}
      >
        <h1
          className="video-hero__title"
          style={{
            transform: `scale(${titleScale})`,
            color: `rgb(${colorValue}, ${colorValue}, ${colorValue})`,
            transition: "none",
          }}
        >
          {yourName}
        </h1>
        <h2
          style={{
            transform: `translateY(${subtitleTranslateY}px) scale(${subtitleScale})`,
            color: `rgb(${colorValue}, ${colorValue}, ${colorValue})`,
            transition: "none",
          }}
          className="video-hero__subtitle"
        >
          vfx/graphics
        </h2>
        <h2
          className="hero-social-links"
          style={{
            transform: `translateY(${socialTranslateY}px) scale(${subtitleScale})`,
            opacity: ready ? (shouldHide ? 0 : 1) : 0,
            color: `rgb(${colorValue}, ${colorValue}, ${colorValue})`,
            transition: "none",
          }}
        >
          <a href="mailto:greg@joblove.com">email</a>
          <a
            href="https://www.linkedin.com/in/joblove/"
            target="_blank"
            rel="noreferrer"
          >
            linkedin
          </a>
          <a
            href="https://www.imdb.com/name/nm16396689/"
            target="_blank"
            rel="noreferrer"
          >
            imdb
          </a>
          <a
            href="https://www.instagram.com/gregjoblove/"
            target="_blank"
            rel="noreferrer"
          >
            ig
          </a>
        </h2>
        <div
          id="hero-reel"
          className="max-[768px]:w-[90%] min-[769px]:w-1/2 mx-auto"
          style={{
            transform: `translateY(${reelTranslateY}px)`,
            opacity: ready ? (shouldHide ? 0 : 1) : 0,
            pointerEvents: shouldHide ? "none" : "auto",
            transition: "none",
            zIndex: 30,
          }}
        >
          <div className="relative aspect-video w-full bg-gray-900 border-3 overflow-hidden mx-auto">
            <video
              ref={reelRef}
              className="w-full h-full object-cover"
              controls
            >
              <source
                src={`${MEDIA_BASE_URL}/reels/2026_Short_General_v3a.webm`}
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <h2 className="text-lg font-bold text-left ml-2">2026 REEL</h2>
        </div>
      </div>
      <div style={{ height: spacerHeight }} aria-hidden="true" />
    </>
  );
};

export default Hero;
