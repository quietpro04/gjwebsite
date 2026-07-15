import React from "react";
import { Link } from "react-router-dom";

const AboutSection: React.FC = () => (
  <div id="about">
    <div className="flex flex-col items-center mb-8 gap-2">
      <h2 className="text-6xl font-normal">about</h2>
    </div>
    <div className="mx-auto w-full max-w-[80%] px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Left image placeholder */}
        <div className="md:col-span-4">
          <div className="w-full aspect-[3/4] border-2 border-black shadow-md overflow-hidden">
            <img
              src="https://media.gregjoblove.com/images/Greg_Img_04.webp"
              alt="Greg Joblove"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main copy */}
        <div className="md:col-span-4">
          <p className="text-xl leading-8 text-left">
            I am a visual effects artist based in Brooklyn, NY, specializing in
            compositing, 3D animation, and motion graphics. My background in
            traditional filmmaking, cinematography, editing, and photography
            informs everything I create. (And a potentially unhealthy obsession
            with technical tinkering handles the rest.) When I'm not at my desk
            you can probably catch me wandering somewhere with my camera...
          </p>

          <div className="mt-6 text-left">
            <div className="text-4xl font-normal">greg@joblove.com</div>
            <div className="mt-2 space-x-4 text-lg">
              <a className="underline" href="mailto:greg@joblove.com">
                email
              </a>
              <a
                className="underline"
                href="https://www.linkedin.com/in/joblove/"
                target="_blank"
                rel="noreferrer"
              >
                linkedin
              </a>
              <a
                className="underline"
                href="https://www.imdb.com/name/nm16396689/"
                target="_blank"
                rel="noreferrer"
              >
                imdb
              </a>
              <a
                className="underline"
                href="https://www.instagram.com/gregjoblove/"
                target="_blank"
                rel="noreferrer"
              >
                ig
              </a>
            </div>
          </div>

          <div className="mt-12 text-left">
            <div className="text-2xl font-bold mb-3">PRESS</div>
            <ul className="space-y-2">
              <li>
                <a
                  className="underline"
                  href="https://www.insta360.com/blog/creator-stories/insta360-vfx-reality-capture.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Insta360 Creator Stories Blog
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://wesleyanargus.com/2025/11/11/wesceleb-greg-joblove-on-visual-effects-at-wesleyan-and-beyond/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Wesleyan Argus WesCeleb Feature
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.wesleyan.edu/about/news/2025/02/mag-words-music-and-ai-inside-wesleyans-music-video-production-course.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Wesleyan Magazine
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* What I Do box */}
        <div className="md:col-span-3" style={{ minWidth: "10rem" }}>
          <div className="border-2 border-black">
            <div className="border-b-2 border-black px-4 py-2 text-xl font-bold italic">
              WHAT I DO
            </div>
            <ul className="px-6 py-4 text-left space-y-3">
              <li>- clean up + paint out</li>
              <li>- compositing</li>
              <li>- on-set supervision</li>
              <li>- CG/3D animation</li>
              <li>- motion graphics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="h-8" />

    <div className="mt-12 text-left mx-auto w-full max-w-[80%] px-6 md:px-10">
      <h2 className="text-4xl font-normal">other links</h2>
      <br></br>
      {/* <div className="text-md text-gray-500 italic">
        other pages and resources that might be helpful! 
      </div> */}
      <ul className="space-y-2">
        <li>
          <Link className="underline" to="/tools">
            a tools page with useful resources for students, beginners, and
            people looking for high quality assets
          </Link>
        </li>
        <li>
          <Link className="underline" to="/ideas">
            my I.D.E.A.S. (integrated design, engineering, arts, and sciences)
            portfolio from my time at Wesleyan University.
          </Link>
        </li>
        {/* <li>
          <a className="underline" href="/wes" rel="noreferrer">
            a collection with of the Wesleyan student films I've worked on
          </a>
        </li>
        <li>ad
          <a className="underline" href="/reel" rel="noreferrer">
            cinematography portfolio
          </a>
        </li> */}
      </ul>
    </div>
    <div className="h-28" />
  </div>
);

export default AboutSection;
