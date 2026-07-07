import React from "react";

const MEDIA_BASE_URL = "https://media.gregjoblove.com";

const Reels: React.FC = () => (
  <div>
    <div className="flex flex-col items-center mb-8 gap-2">
      <h2 className="text-6xl font-normal">reels</h2>
    </div>
    <div className="mx-auto w-full max-[768px]:w-[90%] min-[769px]:max-w-[80%] px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative">
          <span className="absolute -top-6 left-1 text-xl font-bold">vfx</span>
          <div className="aspect-video w-full bg-gray-200 border-2 border-black overflow-hidden">
            <video className="w-full h-full object-cover" controls>
              <source
                src={`${MEDIA_BASE_URL}/reels/2026_VFX_v1b.webm`}
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="relative">
          <span className="absolute -top-6 left-1 text-xl font-bold">
            motion
          </span>
          <div className="aspect-video w-full bg-gray-200 border-2 border-black overflow-hidden">
            <video className="w-full h-full object-cover" controls>
              <source
                src={`${MEDIA_BASE_URL}/reels/2026_motion_v1a.webm`}
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
    <div className="h-20" />
  </div>
);

export default Reels;
