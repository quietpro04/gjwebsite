import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox";
import HorizontalLightbox from "./HorizontalLightbox";
import Navbar from "./Navbar";
import ProjectsSection from "./ProjectsSection";
import { Project, parseProjects } from "../utils/projectParse";
import Hero from "./Hero";
import LogosCarousel from "./LogosCarousel";
import Reels from "./Reels";
import AboutSection from "./AboutSection";
import Monogram from "./Monogram";

interface WebsiteContentProps {
  isVisible: boolean;
}

const WebsiteContent: React.FC<WebsiteContentProps> = ({ isVisible }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const lightboxAnimatedRef = useRef(false);
  const lightboxIsOpen = selectedProject !== null;
  useEffect(() => {
    if (lightboxIsOpen) {
      lightboxAnimatedRef.current = true;
    } else {
      lightboxAnimatedRef.current = false;
    }
  }, [lightboxIsOpen]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filmProjects, setFilmProjects] = useState<Project[]>([]);
  const [experimentProjects, setExperimentProjects] = useState<Project[]>([]);
  const [hideHero, setHideHero] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroProgress, setHeroProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const titleContainerRef = useRef<HTMLDivElement | null>(null);
  const heroReelRef = useRef<HTMLVideoElement>(null);
  const contentReelRef = useRef<HTMLVideoElement>(null);

  // Sync reel video state when transitioning between hero and content views
  useLayoutEffect(() => {
    const heroVideo = heroReelRef.current;
    const contentVideo = contentReelRef.current;
    if (!heroVideo || !contentVideo) return;

    if (hideHero) {
      // Hero reel becoming hidden, content reel becoming visible
      contentVideo.currentTime = heroVideo.currentTime;
      if (heroVideo.paused) {
        contentVideo.pause();
      } else {
        contentVideo.play().catch(() => {});
      }
      heroVideo.pause();
    } else {
      // Content reel becoming hidden, hero reel becoming visible
      heroVideo.currentTime = contentVideo.currentTime;
      if (contentVideo.paused) {
        heroVideo.pause();
      } else {
        heroVideo.play().catch(() => {});
      }
      contentVideo.pause();
    }
  }, [hideHero]);

  const handleHeroProgress = (progress: number) => {
    setHeroProgress(progress);
    setHideHero(progress >= 1);
  };
  // Fetch all projects on component mount
  useEffect(() => {
    parseProjects("/gjprojects.csv", "projects")
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => {
        console.error("Error parsing projects:", err);
      });
  }, []);
  useEffect(() => {
    parseProjects("/gjfilm+tv.csv", "film+tv")
      .then((data) => {
        setFilmProjects(data);
      })
      .catch((err) => {
        console.error("Error parsing projects:", err);
      });
  }, []);
  useEffect(() => {
    parseProjects("/gjexperiments.csv", "experiments")
      .then((data) => {
        setExperimentProjects(data);
      })
      .catch((err) => {
        console.error("Error parsing experiments:", err);
      });
  }, []);

  // Animation variants for the content sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative">
      {/* White-to-transparent top gradient on mobile after hero hides */}
      {hideHero && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 left-0 w-full md:hidden pointer-events-none z-30"
          style={{
            height: "80px",
            background:
              "linear-gradient(to bottom, white 40%, transparent 100%)",
          }}
        />
      )}
      {/* Navbar appears after hero transitions out */}
      {hideHero && (
        <Navbar
          isVisible={hideHero}
          isEnabled={!selectedProject}
          onMenuOpenChange={setMenuOpen}
        />
      )}
      {hideHero && (
        <Monogram
          isVisible={hideHero}
          isEnabled={!selectedProject ? true : false}
          menuOpen={menuOpen}
        />
      )}

      {/* Lightbox rendered here (sibling to Monogram) so its z-50 stacks above Monogram z-40 */}
      {selectedProject &&
        (() => {
          const skipAnimation = lightboxAnimatedRef.current;
          const allProjects = experimentProjects.some(
            (p) => p.shorthand === selectedProject.shorthand,
          )
            ? experimentProjects
            : filmProjects.some(
                  (p) => p.shorthand === selectedProject.shorthand,
                )
              ? filmProjects
              : projects;
          return selectedProject.mediaAspect === "h" ? (
            <HorizontalLightbox
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              allProjects={allProjects}
              onNavigate={setSelectedProject}
              skipAnimation={skipAnimation}
            />
          ) : (
            <Lightbox
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              allProjects={allProjects}
              onNavigate={setSelectedProject}
              skipAnimation={skipAnimation}
            />
          );
        })()}

      {/* Hero Section */}
      <Hero
        shouldHide={hideHero}
        onProgress={handleHeroProgress}
        reelRef={heroReelRef}
      />

      {/* Main content container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-0 w-screen px-0"
      >
        <div
          className="title-container"
          ref={titleContainerRef}
          style={{
            visibility: hideHero ? "visible" : "hidden",
            pointerEvents: hideHero ? "auto" : "none",
            transition: "none",
          }}
          aria-hidden={!hideHero}
        >
          <h1 className="title" style={{ transform: "scale(0.7)" }}>
            GREG JOBLOVE
          </h1>
          <h2
            className="subtitle"
            style={{
              transform: `translateY(${isMobile ? -15 : -25}px) scale(0.7)`,
            }}
          >
            vfx/graphics
          </h2>
          <h2
            className="social-links"
            style={{
              transform: `translateY(${isMobile ? -15 : -25}px) scale(0.7)`,
            }}
          >
            <a href="mailto:greg@joblove.com">email</a>
            <a href="https://www.linkedin.com/in/joblove/">linkedin</a>
            <a href="https://www.imdb.com/name/nm16396689/">imdb</a>
            <a href="https://www.instagram.com/gregjoblove/">ig</a>
          </h2>
          {/* Main Video Reel */}
          <motion.section
            variants={itemVariants}
            id="reel"
            className="mb-20 max-[768px]:w-[90%] min-[769px]:w-1/2 mx-auto"
          >
            <div className="relative aspect-video w-full bg-gray-900 border-3 overflow-hidden mx-auto">
              <video
                ref={contentReelRef}
                className="w-full h-full object-cover"
                controls
              >
                <source
                  src="https://media.gregjoblove.com/reels/2026_Short_General_v3.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <h2 className="text-lg font-bold text-left ml-2">2026 REEL</h2>
          </motion.section>
        </div>
        {/* Projects Section */}
        <ProjectsSection
          itemVariants={itemVariants}
          onSelectProject={setSelectedProject}
          projects={projects}
          filmProjects={filmProjects}
          experimentProjects={experimentProjects}
          heroProgress={heroProgress}
        />
        {/* Client Logos Carousel */}
        <LogosCarousel />
        <div className="h-20" />
        {/* Reels Section */}
        <div id="reels"></div>
        <Reels />
        <AboutSection />
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
    </div>
  );
};

export default WebsiteContent;
