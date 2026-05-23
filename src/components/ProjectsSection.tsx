import { useState, useEffect, useRef } from "react";
import { Project, parseProjects } from "../utils/projectParse";

interface ProjectsSectionProps {
  itemVariants: any;
  onSelectProject?: (project: Project) => void;
  projects?: Project[];
  filmProjects?: Project[];
  experimentProjects?: Project[];
  heroProgress?: number;
}

type ProjectCategory = "VFX" | "MoGraph";

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  projects: passedProjects,
  filmProjects: passedFilmProjects,
  experimentProjects: passedExperimentProjects,
  heroProgress = 1,
}) => {
  // track selected categories
  const [selectedCategories, setSelectedCategories] = useState<
    ProjectCategory[]
  >(["VFX", "MoGraph"]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filmProjects, setFilmProjects] = useState<Project[]>([]);
  const [experimentProjects, setExperimentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [centeredItem, setCenteredItem] = useState<string | null>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const findCentered = () => {
      if (!isMobile) {
        setCenteredItem(null);
        return;
      }
      const midY = window.innerHeight / 2;
      let closestKey: string | null = null;
      let closestDist = Infinity;
      itemRefs.current.forEach((el, key) => {
        const rect = el.getBoundingClientRect();
        const itemMidY = (rect.top + rect.bottom) / 2;
        const dist = Math.abs(itemMidY - midY);
        if (dist < closestDist) {
          closestDist = dist;
          closestKey = key;
        }
      });
      setCenteredItem(closestDist < window.innerHeight / 8 ? closestKey : null);
    };

    window.addEventListener("scroll", findCentered);
    window.addEventListener("resize", findCentered);
    requestAnimationFrame(findCentered);
    return () => {
      window.removeEventListener("scroll", findCentered);
      window.removeEventListener("resize", findCentered);
    };
  }, [isMobile]);

  const clampedProgress = Math.min(
    1,
    Math.max(0, (heroProgress - 0.6) / (1.0 - 0.6)),
  );
  const translateY = isMobile
    ? window.innerHeight * 0.5 * (1 - clampedProgress)
    : 0;

  useEffect(() => {
    if (passedProjects && passedProjects.length > 0) {
      setProjects(passedProjects);
      setLoading(false);
    } else {
      parseProjects("/gjprojects.csv", "projects")
        .then((data) => {
          setProjects(data);
        })
        .catch((err) => {
          console.error("Error parsing projects:", err);
          setError(err.message);
        })
        .finally(() => setLoading(false));
    }
  }, [passedProjects]);

  useEffect(() => {
    if (passedFilmProjects && passedFilmProjects.length > 0) {
      setFilmProjects(passedFilmProjects);
      setLoading(false);
    } else {
      parseProjects("/gjfilm+tv.csv", "film+tv")
        .then((data) => {
          setFilmProjects(data);
        })
        .catch((err) => {
          console.error("Error parsing film+tv projects:", err);
          setError(err.message);
        })
        .finally(() => setLoading(false));
    }
  }, [passedFilmProjects]);

  useEffect(() => {
    if (passedExperimentProjects && passedExperimentProjects.length > 0) {
      setExperimentProjects(passedExperimentProjects);
    } else {
      parseProjects("/gjexperiments.csv", "experiments")
        .then((data) => {
          setExperimentProjects(data);
        })
        .catch((err) => {
          console.error("Error parsing experiments:", err);
          setError(err.message);
        });
    }
  }, [passedExperimentProjects]);

  const toggleCategory = (category: ProjectCategory) => {
    setSelectedCategories((prev) => {
      let updated: ProjectCategory[];
      if (prev.includes(category)) {
        updated = prev.filter((c) => c !== category);
        if (updated.length === 0) {
          const allCategories: ProjectCategory[] = ["VFX", "MoGraph"];
          const other = allCategories.find(
            (c) => c !== category,
          ) as ProjectCategory;
          updated = [other];
        }
      } else {
        updated = [...prev, category];
      }
      return updated;
    });
  };

  const handleProjectClick = (project: Project) => {
    if (onSelectProject) {
      onSelectProject(project);
    }
  };

  // filter list based on selected categories
  const filteredProjects =
    selectedCategories.length > 0
      ? projects.filter(
          (p) =>
            p.category &&
            selectedCategories.includes(p.category as ProjectCategory),
        )
      : projects;

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error loading projects: {error}</div>;

  return (
    <div id="projects" style={{ transform: `translateY(${translateY}px)` }}>
      <div className="flex flex-col items-center mb-8 gap-2">
        <h2 className="text-6xl font-normal">work</h2>
        {/* <a
          href="https://media.gregjoblove.com/docs/Joblove_Resume-Website_2026.pdf"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-gray-500 underline italic"
        >
          view cv
        </a> */}
      </div>

      {/* Projects list */}
      <div className="relative px-4 md:px-10 py-8 max-w-[80%] md:mx-auto max-[768px]:ml-1 max-[768px]:max-w-[98%]">
        <h3 className="italic text-4xl mb-4 text-left">projects</h3>
        {/* Category filters */}
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="vfx-filter"
              checked={selectedCategories.includes("VFX")}
              onChange={() => toggleCategory("VFX")}
              className="w-4 h-4"
            />
            <label htmlFor="vfx-filter" className="text-md font-bold italic">
              VFX
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="mograph-filter"
              checked={selectedCategories.includes("MoGraph")}
              onChange={() => toggleCategory("MoGraph")}
              className="w-4 h-4"
            />
            <label
              htmlFor="mograph-filter"
              className="text-md font-bold italic"
            >
              MoGraph
            </label>
          </div>
        </div>
        <div className="flex flex-wrap justify-center max-[768px]:flex-col max-[768px]:items-start">
          {filteredProjects.map((project, idx) => {
            const itemKey = `projects-${idx}`;
            const isCentered = isMobile && centeredItem === itemKey;
            return (
              <div
                key={idx}
                ref={(el) => {
                  if (el) itemRefs.current.set(itemKey, el);
                  else itemRefs.current.delete(itemKey);
                }}
                className="inline-block mx-6 max-[768px]:mx-0 text-xl font-normal my-4 max-[768px]:my-1 px-1 py-1 max-[768px]:text-left"
              >
                <span
                  className={`hover:bg-black hover:text-white py-0 cursor-pointer${isCentered ? " bg-black text-white" : ""}`}
                  onClick={() => handleProjectClick(project)}
                >
                  {project.name}
                  {project.subtitle ? ` (${project.subtitle})` : ""}
                </span>
                <sup className="align-super text-sm ml-1">
                  {project.year.slice(-4)}
                </sup>
              </div>
            );
          })}
        </div>
      </div>

      {/* Film + TV Projects list*/}
      <div className="relative px-4 md:px-10 py-8 max-w-[80%] md:mx-auto max-[768px]:ml-1 max-[768px]:max-w-[98%]">
        <h3 className="italic text-4xl mb-4 text-left">film + tv</h3>

        <div className="flex flex-wrap justify-center max-[768px]:flex-col max-[768px]:items-start">
          {filmProjects.map((project, idx) => {
            const itemKey = `film-${idx}`;
            const isCentered = isMobile && centeredItem === itemKey;
            return (
              <div
                key={idx}
                ref={(el) => {
                  if (el) itemRefs.current.set(itemKey, el);
                  else itemRefs.current.delete(itemKey);
                }}
                className="inline-block mx-4 max-[768px]:mx-0 text-xl font-normal my-2 max-[768px]:my-1 px-1 py-1 max-[768px]:text-left"
              >
                <span
                  className={`hover:text-white hover:bg-black cursor-pointer${isCentered ? " bg-black text-white" : ""}`}
                  onClick={() => handleProjectClick(project)}
                >
                  {project.name}
                  {project.subtitle ? ` (${project.subtitle})` : ""}
                </span>
                <sup className="align-super text-sm ml-1">
                  {project.year.slice(-4)}
                </sup>
              </div>
            );
          })}
        </div>
      </div>

      {/* Experiments list */}
      <div className="relative px-4 md:px-10 py-8 max-w-[80%] md:mx-auto max-[768px]:ml-1 max-[768px]:max-w-[98%]">
        <h3 className="italic text-4xl mb-4 text-left">experiments</h3>

        <div className="flex flex-wrap justify-center max-[768px]:flex-col max-[768px]:items-start">
          {experimentProjects.map((project, idx) => {
            const itemKey = `experiments-${idx}`;
            const isCentered = isMobile && centeredItem === itemKey;
            return (
              <div
                key={idx}
                ref={(el) => {
                  if (el) itemRefs.current.set(itemKey, el);
                  else itemRefs.current.delete(itemKey);
                }}
                className="inline-block mx-4 max-[768px]:mx-0 text-xl font-normal my-2 max-[768px]:my-1 px-1 py-1 max-[768px]:text-left"
              >
                <span
                  className={`hover:text-white hover:bg-black cursor-pointer${isCentered ? " bg-black text-white" : ""}`}
                  onClick={() => handleProjectClick(project)}
                >
                  {project.name}
                  {project.subtitle ? ` (${project.subtitle})` : ""}
                </span>
                {project.year ? (
                  <sup className="align-super text-sm ml-1">
                    {project.year.slice(-4)}
                  </sup>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
