import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MEDIA_BASE_URL = "https://media.gregjoblove.com";

const MainReel: React.FC = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="tools-page min-h-screen"
    >
      {/* Site header */}
      <div className="homepage-info" ref={headerRef}>
        <h1 className="heading">
          <Link to="/">GREG JOBLOVE</Link>
        </h1>
        <div className="subtitle-container">
          <h2 className="subtitle">vfx/graphics</h2>
          <div
            className="link-container"
            style={{ display: "flex", gap: "15px" }}
          >
            <a href="mailto:greg@joblove.com">email</a>
            <a
              href="https://www.linkedin.com/in/joblove/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin
            </a>
            <a
              href="https://www.imdb.com/name/nm16396689/"
              target="_blank"
              rel="noopener noreferrer"
            >
              imdb
            </a>
            <a
              href="https://www.instagram.com/gregjoblove/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ig
            </a>
          </div>
        </div>
      </div>

<div className="body" style={{ paddingTop: "80px" }}>
        {/* Main Reel */}
        <div
          style={{
            maxWidth: "80%",
            margin: "0 auto",
          }}
        >
          <div className="aspect-video w-full bg-gray-900 border-2 border-black overflow-hidden">
            <video className="w-full h-full object-cover" controls autoPlay>
              <source
                src={`${MEDIA_BASE_URL}/reels/2026_Short_General_v3a.webm`}
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <h2 className="text-lg font-bold text-left ml-1 mt-1">2026 REEL</h2>
        </div>

        {/* <h3 className="italic text-4xl mb-6 text-center">↓  more reels ↓</h3> */}

        {/* Secondary Reels */}
        <div
          className="flex flex-col sm:flex-row gap-4"
          style={{
            maxWidth: "80%",
            margin: "24px auto 0",
          }}
        >
          <div className="flex-1">
            <div className="aspect-video w-full bg-gray-900 border-2 border-black overflow-hidden">
              <video className="w-full h-full object-cover" controls>
                <source
                  src={`${MEDIA_BASE_URL}/reels/2026_VFX_v1b.webm`}
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <h2 className="text-lg font-bold text-left ml-1 mt-1">2026 VFX REEL</h2>
          </div>

          <div className="flex-1">
            <div className="aspect-video w-full bg-gray-900 border-2 border-black overflow-hidden">
              <video className="w-full h-full object-cover" controls>
                <source
                  src={`${MEDIA_BASE_URL}/reels/2026_motion_v1a.webm`}
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <h2 className="text-lg font-bold text-left ml-1 mt-1">2026 MOTION REEL</h2>
          </div>
        </div>

      </div>
      <footer className="w-full text-center py-[20px] text-black text-[10px]">
        <p className="my-[10px]">
          © {new Date().getFullYear()} Greg Joblove. All rights reserved.
        </p>
        <p className="italic my-[10px]">
          Site designed by me, built by{" "}
          <a
            href="https://www.linkedin.com/in/matthewrichc/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Matthew Rich
          </a>
        </p>
      </footer>
    </motion.div>
  );
};

export default MainReel;
